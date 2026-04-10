import Link from 'next/link';
import { CountdownDisplay } from '@/components/countdown-display';
import { LaunchCard } from '@/components/launch-card';
import { PixelButton, PixelLabel, PixelPanel, StatusLight } from '@/components/pixel-ui';
import { getJobPostings } from '@/lib/jobs';
import { getRecentLaunches, getUpcomingLaunches } from '@/lib/launches';
import { getNewsStories } from '@/lib/news';
import { toCompanySlug } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function MetricCard({ label, value, tone = 'slate' }: { label: string; value: string; tone?: 'cyan' | 'pink' | 'yellow' | 'slate' }) {
  return (
    <PixelPanel tone={tone} className="p-4">
      <PixelLabel className="text-pixelGold">{label}</PixelLabel>
      <div className="mt-3 text-sm font-bold uppercase leading-6 text-parchment md:text-base">{value}</div>
    </PixelPanel>
  );
}

export default async function HomePage() {
  const [upcomingLaunches, recentLaunches, stories, jobs] = await Promise.all([
    getUpcomingLaunches(4),
    getRecentLaunches(4),
    getNewsStories(5).catch(() => []),
    getJobPostings(6).catch(() => [])
  ]);

  const featuredLaunch = upcomingLaunches[0] ?? recentLaunches[0] ?? null;

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="inline-flex items-center gap-3 border-2 border-pixelPink bg-[#21112a] px-4 py-3 shadow-pixelSm">
            <StatusLight color="yellow" blink />
            <span className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.16em] text-pixelGold">
              National Space Operations Feed
            </span>
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-pixel)] text-2xl uppercase leading-[1.6] text-parchment md:text-4xl">
            Track every U.S. launch site,
            <span className="mt-3 block text-pixelCyan">follow mission progress,</span>
            <span className="mt-3 block text-pixelPink">scan news, and hunt jobs.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">
            Project Love Rocky is a mission-control style dashboard for launch activity across the United States, paired with an
            aerospace news feed and broader industry job listings.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PixelButton label="Open Launch Board" href="/launches" tone="cyan" />
            <PixelButton label="Open Tracker" href="/tracker" tone="yellow" />
            <PixelButton label="Scan Jobs" href="/jobs" tone="pink" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MetricCard label="Upcoming Launches" value={`${upcomingLaunches.length} on deck`} tone="cyan" />
            <MetricCard label="Recent Launches" value={`${recentLaunches.length} archived`} tone="pink" />
            <MetricCard label="Live Feeds" value={`${stories.length} news + ${jobs.length} jobs`} tone="yellow" />
          </div>
        </div>

        <PixelPanel tone="cyan" className="p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <PixelLabel className="text-pixelCyan">Primary Launch Watch</PixelLabel>
              <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase leading-[1.5] md:text-2xl">
                {featuredLaunch?.name ?? 'Awaiting next U.S. mission'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 border-2 border-pixelGreen bg-[#17301d] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-pixelGreen shadow-pixelSm">
              <StatusLight color={featuredLaunch?.status === 'GO' ? 'green' : 'cyan'} blink />
              <span className="font-[family-name:var(--font-pixel)]">{featuredLaunch?.status ?? 'Standby'}</span>
            </div>
          </div>

          <PixelPanel tone="pink" className="mt-6 p-5">
            <PixelLabel className="text-pixelGold">Countdown</PixelLabel>
            <div className="mt-4 font-[family-name:var(--font-pixel)] text-3xl uppercase leading-[1.4] text-pixelCyan md:text-5xl">
              {featuredLaunch ? <CountdownDisplay net={featuredLaunch.net} /> : 'TBD'}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.14em] text-[#d9d4b8]">
              <span className="border border-steel bg-panel px-2 py-1">{featuredLaunch?.site ?? 'No U.S. launch scheduled'}</span>
              <span className="border border-steel bg-panel px-2 py-1">Provider: {featuredLaunch?.provider ?? 'Unknown'}</span>
              <span className="border border-steel bg-panel px-2 py-1">NET: {featuredLaunch ? new Date(featuredLaunch.net).toLocaleString() : 'TBD'}</span>
            </div>
          </PixelPanel>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <MetricCard label="Launch Coverage" value="All U.S. pads" tone="slate" />
            <MetricCard label="Tracker Mode" value="Live context + replay" tone="slate" />
            <MetricCard label="News Scope" value="Official + industry" tone="slate" />
            <MetricCard label="Careers" value="Broader aerospace" tone="slate" />
          </div>
        </PixelPanel>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <PixelLabel className="text-pixelCyan">Upcoming U.S. Launches</PixelLabel>
              <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase md:text-2xl">Mission queue</h2>
            </div>
            <Link href="/launches" className="text-[10px] uppercase tracking-[0.16em] text-pixelGold">
              View full board
            </Link>
          </div>
          <div className="grid gap-4">
            {upcomingLaunches.length ? upcomingLaunches.map((launch) => <LaunchCard key={launch.id} launch={launch} />) : (
              <PixelPanel tone="slate" className="p-5 text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">
                No upcoming U.S. launches were returned by the upstream provider.
              </PixelPanel>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <PixelLabel className="text-pixelPink">News Pulse</PixelLabel>
            <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase md:text-2xl">Industry headlines</h2>
          </div>
          <PixelPanel tone="pink" className="p-5">
            <div className="space-y-4">
              {stories.length ? stories.map((story, index) => (
                <a
                  key={`${story.id}-${index}`}
                  href={story.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block border-2 border-steel bg-panel p-4 shadow-pixelSm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-pixelCyan">
                      <StatusLight color={index % 2 === 0 ? 'cyan' : 'pink'} blink />
                      <span className="font-[family-name:var(--font-pixel)]">{story.source}</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-pixelGold">{story.category}</div>
                  </div>
                  <div className="mt-3 text-sm font-bold uppercase leading-6 text-parchment">{story.title}</div>
                </a>
              )) : (
                <div className="text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">No stories available from the configured feeds.</div>
              )}
            </div>
          </PixelPanel>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <div>
            <PixelLabel className="text-pixelGold">Recent Flight Log</PixelLabel>
            <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase md:text-2xl">Previous launches</h2>
          </div>
          <div className="grid gap-4">
            {recentLaunches.length ? recentLaunches.map((launch) => <LaunchCard key={launch.id} launch={launch} />) : (
              <PixelPanel tone="slate" className="p-5 text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">
                No recent U.S. launches were returned by the upstream provider.
              </PixelPanel>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <PixelLabel className="text-pixelGold">Career Radar</PixelLabel>
              <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase md:text-2xl">Broader aerospace roles</h2>
            </div>
            <Link href="/jobs" className="text-[10px] uppercase tracking-[0.16em] text-pixelCyan">
              View all jobs
            </Link>
          </div>
          <PixelPanel tone="yellow" className="p-5">
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.length ? jobs.map((job, index) => (
                <div key={job.id} className="border-2 border-steel bg-panel p-4 shadow-pixelSm">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-pixelPink">
                    <StatusLight color={index % 2 === 0 ? 'yellow' : 'pink'} blink />
                    <Link href={`/companies/${toCompanySlug(job.company)}`} className="font-[family-name:var(--font-pixel)] underline decoration-steel underline-offset-4">
                      {job.company}
                    </Link>
                  </div>
                  <div className="mt-3 text-sm font-bold uppercase leading-6 text-parchment">{job.title}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#d9d4b8]">{job.location}</div>
                </div>
              )) : (
                <div className="text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">No jobs available from the configured boards.</div>
              )}
            </div>
          </PixelPanel>
        </div>
      </section>
    </div>
  );
}
