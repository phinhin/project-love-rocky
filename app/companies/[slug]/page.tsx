import Link from 'next/link';
import { LaunchCard } from '@/components/launch-card';
import { PixelButton, PixelLabel, PixelPanel, StatusLight } from '@/components/pixel-ui';
import { getJobPostings } from '@/lib/jobs';
import { getUpcomingLaunches } from '@/lib/launches';
import { getNewsStories } from '@/lib/news';
import { toCompanySlug } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const companyName = slug.replace(/-/g, ' ');
  const normalized = companyName.toLowerCase();
  const [launches, jobs, stories] = await Promise.all([
    getUpcomingLaunches(18).catch(() => []),
    getJobPostings(40).catch(() => []),
    getNewsStories(40).catch(() => [])
  ]);

  const matchingLaunches = launches.filter((launch) => launch.provider.toLowerCase().includes(normalized));
  const matchingJobs = jobs.filter((job) => job.company.toLowerCase().includes(normalized));
  const matchingStories = stories.filter((story) =>
    [story.title, story.source, story.summary].join(' ').toLowerCase().includes(normalized)
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.18em] text-pixelCyan">Company Channel</div>
        <h1 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase leading-[1.5] md:text-3xl">{companyName}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <PixelPanel tone="cyan" className="p-5">
          <PixelLabel className="text-pixelGold">Launches</PixelLabel>
          <div className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase text-parchment">{matchingLaunches.length} tracked</div>
        </PixelPanel>
        <PixelPanel tone="yellow" className="p-5">
          <PixelLabel className="text-pixelGold">Jobs</PixelLabel>
          <div className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase text-parchment">{matchingJobs.length} open roles</div>
        </PixelPanel>
        <PixelPanel tone="pink" className="p-5">
          <PixelLabel className="text-pixelGold">News</PixelLabel>
          <div className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase text-parchment">{matchingStories.length} stories</div>
        </PixelPanel>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <PixelLabel className="text-pixelCyan">Launch coverage</PixelLabel>
            <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase md:text-2xl">Related missions</h2>
          </div>
          <div className="grid gap-4">
            {matchingLaunches.length ? matchingLaunches.map((launch) => <LaunchCard key={launch.id} launch={launch} />) : (
              <PixelPanel tone="slate" className="p-5 text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">
                No matching upcoming launches were found for this company in the current U.S. mission list.
              </PixelPanel>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <PixelLabel className="text-pixelGold">Hiring board</PixelLabel>
            <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase md:text-2xl">Open roles</h2>
          </div>
          <PixelPanel tone="yellow" className="p-5">
            <div className="grid gap-4">
              {matchingJobs.length ? matchingJobs.map((job, index) => (
                <div key={job.id} className="border-2 border-steel bg-panel p-4 shadow-pixelSm">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-pixelPink">
                    <StatusLight color={index % 2 === 0 ? 'yellow' : 'pink'} blink />
                    <Link href={`/companies/${toCompanySlug(job.company)}`} className="font-[family-name:var(--font-pixel)] underline decoration-steel underline-offset-4">
                      {job.company}
                    </Link>
                  </div>
                  <div className="mt-3 text-sm font-bold uppercase leading-6 text-parchment">{job.title}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#d9d4b8]">{job.location}</div>
                  <div className="mt-4">
                    <PixelButton label="View Role" tone="cyan" href={job.url} />
                  </div>
                </div>
              )) : (
                <div className="text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">No matching jobs were found for this company.</div>
              )}
            </div>
          </PixelPanel>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <PixelLabel className="text-pixelPink">News mentions</PixelLabel>
            <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase md:text-2xl">Company stories</h2>
          </div>
          <Link href="/news" className="text-[10px] uppercase tracking-[0.16em] text-pixelCyan">
            Open full feed
          </Link>
        </div>
        <PixelPanel tone="pink" className="p-5">
          <div className="space-y-4">
            {matchingStories.length ? matchingStories.slice(0, 8).map((story, index) => (
              <a
                key={story.id}
                href={story.url}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-steel bg-panel p-4 shadow-pixelSm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-pixelCyan">
                  <StatusLight color={index % 2 === 0 ? 'cyan' : 'pink'} blink />
                  <span className="font-[family-name:var(--font-pixel)]">{story.source}</span>
                </div>
                <div className="mt-3 text-sm font-bold uppercase leading-6 text-parchment">{story.title}</div>
              </a>
            )) : (
              <div className="text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">No recent stories matched this company name.</div>
            )}
          </div>
        </PixelPanel>
      </div>
    </div>
  );
}
