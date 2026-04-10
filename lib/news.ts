export type NewsStory = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
  category: string;
};

type NewsFeed = {
  label: string;
  url: string;
  category?: string;
};

const DEFAULT_FEEDS: NewsFeed[] = [
  { label: 'NASA', url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss', category: 'Agency' },
  { label: 'JPL', url: 'https://www.jpl.nasa.gov/rss/news.xml', category: 'Mission' },
  { label: 'SpaceNews', url: 'https://spacenews.com/feed/', category: 'Industry' },
  { label: 'NASASpaceflight', url: 'https://www.nasaspaceflight.com/feed/', category: 'Launch' },
  { label: 'Ars Technica Space', url: 'https://arstechnica.com/science/feed/', category: 'Analysis' },
  { label: 'Space.com', url: 'https://www.space.com/feeds/all', category: 'Coverage' }
];

function decodeHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match?.[1]?.trim() ?? '';
}

function safeId(input: string) {
  return Buffer.from(input).toString('base64url');
}

function parseFeed(xml: string, feed: NewsFeed): NewsStory[] {
  const itemBlocks = Array.from(xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)).map((m) => m[0]);
  const entryBlocks = Array.from(xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)).map((m) => m[0]);
  const blocks = itemBlocks.length ? itemBlocks : entryBlocks;

  return blocks.map((block) => {
    const rawTitle = getTag(block, 'title');
    const title = decodeHtml(rawTitle);
    const linkTag = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1]?.trim();
    const hrefAttr = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i)?.[1]?.trim();
    const url = decodeHtml(hrefAttr || linkTag || getTag(block, 'guid') || feed.url);
    const publishedAt = decodeHtml(getTag(block, 'pubDate') || getTag(block, 'published') || getTag(block, 'updated'));
    const summary = decodeHtml(getTag(block, 'description') || getTag(block, 'summary') || getTag(block, 'content'));
    const category = decodeHtml(getTag(block, 'category')) || feed.category || 'General';

    return {
      id: safeId(`${feed.label}:${url}`),
      title,
      url,
      source: feed.label,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date(0).toISOString(),
      summary,
      category
    };
  }).filter((story) => story.title && story.url);
}

function getConfiguredFeeds(): NewsFeed[] {
  const raw = process.env.NEWS_FEEDS_JSON;
  if (!raw) return DEFAULT_FEEDS;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_FEEDS;
    return parsed.filter((item) => item && typeof item.label === 'string' && typeof item.url === 'string');
  } catch {
    return DEFAULT_FEEDS;
  }
}

export async function getNewsStories(limit = 18): Promise<NewsStory[]> {
  const feeds = getConfiguredFeeds();
  const results = await Promise.all(
    feeds.map(async (feed) => {
      try {
        const response = await fetch(feed.url, { next: { revalidate: 900 } });
        if (!response.ok) return [] as NewsStory[];
        const xml = await response.text();
        return parseFeed(xml, feed);
      } catch {
        return [] as NewsStory[];
      }
    })
  );

  return results
    .flat()
    .filter((story, index, stories) => stories.findIndex((candidate) => candidate.url === story.url || candidate.title === story.title) === index)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}
