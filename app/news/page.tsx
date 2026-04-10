import Link from 'next/link';
import { PixelPanel, StatusLight } from '@/components/pixel-ui';
import { SectionHeading } from '@/components/section-heading';
import { getNewsStories, type NewsStory } from '@/lib/news';

export const dynamic = 'force-dynamic';

function filterStories(stories: NewsStory[], query: string) {
  if (!query) return stories;
  const normalized = query.toLowerCase();
  return stories.filter((story) =>
    [story.title, story.source, story.category, story.summary]
      .join(' ')
      .toLowerCase()
      .includes(normalized)
  );
}

export default async function NewsPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? '';
  const stories = filterStories(await getNewsStories(24).catch(() => []), query);

  return (
    <div className="space-y-8">
      <SectionHeading
        kicker="Aerospace Feed"
        title="News aggregation bay"
        description="This route pulls live RSS-backed stories. The default mix includes official NASA and JPL feeds plus broader industry coverage such as SpaceNews, NASASpaceflight, Ars Technica, and Space.com."
      />
      <PixelPanel tone="slate" className="p-5">
        <form className="grid gap-4 md:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="mb-2 block font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.16em] text-pixelGold">
              Filter by source, category, headline, or summary
            </span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Try launch, lunar, SpaceX, NASA, contracts..."
              className="w-full border-2 border-steel bg-[#12192b] px-4 py-3 text-sm uppercase tracking-[0.08em] text-parchment outline-none transition focus:border-pixelCyan"
            />
          </label>
          <button
            type="submit"
            className="border-2 border-pixelCyan bg-[#0f2430] px-4 py-3 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.18em] text-pixelCyan shadow-pixelSm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Apply Filter
          </button>
        </form>
      </PixelPanel>
      <PixelPanel tone="pink" className="p-5 md:p-6">
        <div className="space-y-4">
          {stories.map((story, index) => (
            <Link key={`${story.id}-${index}`} href={story.url} target="_blank" className="block border-2 border-steel bg-panel p-4 shadow-pixelSm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-pixelCyan">
                  <StatusLight color={index % 2 === 0 ? 'cyan' : 'pink'} blink />
                  <span className="font-[family-name:var(--font-pixel)]">{story.source}</span>
                </div>
                <div className="border-2 border-pixelPink bg-[#21112a] px-2 py-1 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.14em] text-pixelPink">{story.category}</div>
              </div>
              <div className="mt-3 text-sm font-bold uppercase leading-7 text-parchment md:text-base">{story.title}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#d9d4b8]">{new Date(story.publishedAt).toLocaleString()}</div>
              {story.summary ? <p className="mt-3 text-sm uppercase tracking-[0.06em] text-[#d9d4b8]">{story.summary}</p> : null}
            </Link>
          ))}
          {!stories.length ? <div className="text-sm uppercase text-[#d9d4b8]">No stories were returned. Add more feed URLs in NEWS_FEEDS_JSON.</div> : null}
        </div>
      </PixelPanel>
    </div>
  );
}
