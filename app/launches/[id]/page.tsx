import { notFound } from 'next/navigation';
import { PixelLabel, PixelPanel, StatusLight } from '@/components/pixel-ui';
import { getLaunchById } from '@/lib/launches';

export const dynamic = 'force-dynamic';

export default async function LaunchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const launch = await getLaunchById(id);

  if (!launch) notFound();

  return (
    <div className="space-y-8">
      <div>
        <PixelLabel className="text-pixelCyan">Launch Detail</PixelLabel>
        <h1 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase leading-[1.5] md:text-3xl">{launch.name}</h1>
      </div>

      <PixelPanel tone="cyan" className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <StatusLight color={launch.status === 'GO' ? 'green' : 'cyan'} blink />
          <div className="font-[family-name:var(--font-pixel)] text-xs uppercase">{launch.status}</div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ['Provider', launch.provider],
            ['Launch Site', launch.site],
            ['Launch Pad', launch.pad ?? 'TBD'],
            ['Mission', launch.mission ?? 'TBD'],
            ['Orbit', launch.orbit ?? 'TBD'],
            ['NET', new Date(launch.net).toLocaleString()]
          ].map(([label, value]) => (
            <div key={label} className="border-2 border-steel bg-panel p-4 shadow-pixelSm">
              <PixelLabel className="text-pixelGold">{label}</PixelLabel>
              <div className="mt-2 text-sm uppercase text-parchment">{value}</div>
            </div>
          ))}
        </div>
      </PixelPanel>
    </div>
  );
}
