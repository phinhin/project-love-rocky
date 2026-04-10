import Link from 'next/link';
import { PixelLabel, PixelPanel, StatusLight } from '@/components/pixel-ui';
import { SectionHeading } from '@/components/section-heading';
import { TrackerPanel } from '@/components/tracker-panel';
import { getUpcomingLaunches } from '@/lib/launches';

export const dynamic = 'force-dynamic';

export default async function TrackerPage({
  searchParams
}: {
  searchParams?: Promise<{ launchId?: string }>;
}) {
  const params = await searchParams;
  const launches = await getUpcomingLaunches(6);
  const launch = launches.find((item) => item.id === params?.launchId) ?? launches[0];

  return (
    <div className="space-y-8">
      <SectionHeading
        kicker="Mission Tracker"
        title="Retro orbital HUD"
        description="This page now uses live launch context plus a modeled telemetry layer so the replay console responds to a real mission instead of static placeholder text."
      />
      {launch ? (
        <div className="space-y-6">
          <PixelPanel tone="slate" className="p-5">
            <PixelLabel className="text-pixelGold">Tracked mission selection</PixelLabel>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {launches.map((item, index) => {
                const active = item.id === launch.id;
                return (
                  <Link
                    key={item.id}
                    href={`/tracker?launchId=${item.id}`}
                    className={`border-2 p-4 shadow-pixelSm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
                      active
                        ? 'border-pixelCyan bg-[#0f2430]'
                        : 'border-steel bg-panel'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-pixelGold">
                      <StatusLight color={active ? 'green' : index % 2 === 0 ? 'cyan' : 'pink'} blink />
                      <span className="font-[family-name:var(--font-pixel)]">{item.provider}</span>
                    </div>
                    <div className="mt-3 text-sm font-bold uppercase leading-6 text-parchment">{item.name}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#d9d4b8]">{item.site}</div>
                  </Link>
                );
              })}
            </div>
          </PixelPanel>
          <TrackerPanel launch={launch} />
        </div>
      ) : (
        <div className="text-sm uppercase text-[#d9d4b8]">No upcoming launch available for the tracker.</div>
      )}
    </div>
  );
}
