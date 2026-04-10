import { LaunchCard } from '@/components/launch-card';
import { PixelLabel, PixelPanel } from '@/components/pixel-ui';
import { SectionHeading } from '@/components/section-heading';
import { getRecentLaunches, getUpcomingLaunches } from '@/lib/launches';
import type { LaunchCard as Launch } from '@/lib/types';

export const dynamic = 'force-dynamic';

function filterLaunches(launches: Launch[], query: string) {
  if (!query) return launches;
  const normalized = query.toLowerCase();
  return launches.filter((launch) =>
    [launch.name, launch.provider, launch.site, launch.pad ?? '', launch.orbit ?? '', launch.status]
      .join(' ')
      .toLowerCase()
      .includes(normalized)
  );
}

function LaunchColumn({
  title,
  description,
  launches
}: {
  title: string;
  description: string;
  launches: Awaited<ReturnType<typeof getUpcomingLaunches>>;
}) {
  return (
    <div className="space-y-5">
      <div>
        <PixelLabel className="text-pixelCyan">{title}</PixelLabel>
        <p className="mt-3 text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">{description}</p>
      </div>
      <div className="grid gap-4">
        {launches.length ? launches.map((launch) => <LaunchCard key={launch.id} launch={launch} />) : (
          <PixelPanel tone="slate" className="p-5 text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">
            No launches were returned for this list.
          </PixelPanel>
        )}
      </div>
    </div>
  );
}

export default async function LaunchesPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? '';
  const [upcomingLaunches, recentLaunches] = await Promise.all([
    getUpcomingLaunches(12),
    getRecentLaunches(12)
  ]);

  const filteredUpcoming = filterLaunches(upcomingLaunches, query);
  const filteredRecent = filterLaunches(recentLaunches, query);
  const uniqueSites = new Set([...filteredUpcoming, ...filteredRecent].map((launch) => launch.site)).size;
  const providers = new Set([...filteredUpcoming, ...filteredRecent].map((launch) => launch.provider)).size;

  return (
    <div className="space-y-8">
      <SectionHeading
        kicker="United States Launch Board"
        title="Launches from every U.S. site"
        description="This board tracks upcoming and recent launches returned by Launch Library and filters them down to United States launch locations only."
      />

      <PixelPanel tone="slate" className="p-5">
        <form className="grid gap-4 md:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="mb-2 block font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.16em] text-pixelGold">
              Filter by mission, site, provider, pad, orbit, or status
            </span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Try Vandenberg, SpaceX, Falcon, Virginia..."
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

      <div className="grid gap-4 md:grid-cols-3">
        <PixelPanel tone="cyan" className="p-5">
          <PixelLabel className="text-pixelGold">Upcoming</PixelLabel>
          <div className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase text-parchment">{filteredUpcoming.length} missions</div>
        </PixelPanel>
        <PixelPanel tone="pink" className="p-5">
          <PixelLabel className="text-pixelGold">Recent</PixelLabel>
          <div className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase text-parchment">{filteredRecent.length} missions</div>
        </PixelPanel>
        <PixelPanel tone="yellow" className="p-5">
          <PixelLabel className="text-pixelGold">Coverage</PixelLabel>
          <div className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase text-parchment">
            {uniqueSites} sites / {providers} providers
          </div>
        </PixelPanel>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <LaunchColumn
          title="Upcoming missions"
          description="Next launches scheduled across Florida, California, Virginia, Alaska, Texas, and any other U.S. site returned upstream."
          launches={filteredUpcoming}
        />
        <LaunchColumn
          title="Recent missions"
          description="The latest completed or recently updated U.S. launch records, kept alongside the upcoming queue for quick context."
          launches={filteredRecent}
        />
      </div>
    </div>
  );
}
