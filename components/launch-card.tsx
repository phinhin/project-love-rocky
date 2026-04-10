import Link from 'next/link';
import type { LaunchCard as LaunchCardType } from '@/lib/types';
import { CountdownDisplay } from '@/components/countdown-display';
import { PixelLabel, StatusLight } from '@/components/pixel-ui';

export function LaunchCard({ launch }: { launch: LaunchCardType }) {
  return (
    <Link
      href={`/launches/${launch.id}`}
      className="block border-2 border-steel bg-panel p-4 shadow-pixelSm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-[family-name:var(--font-pixel)] text-sm uppercase leading-6 text-parchment">{launch.name}</div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#d9d4b8]">{launch.site}</div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-pixelCyan">Provider: {launch.provider}</div>
          {launch.orbit ? <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-pixelGold">Orbit: {launch.orbit}</div> : null}
        </div>
        <div className="text-right">
          <PixelLabel className="text-pixelGold">Countdown</PixelLabel>
          <div className="mt-2 text-lg font-bold uppercase text-pixelCyan"><CountdownDisplay net={launch.net} /></div>
          <div className="mt-2 inline-flex items-center gap-2 border-2 border-pixelCyan bg-[#0f2430] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-pixelCyan">
            <StatusLight color={launch.status === 'GO' ? 'green' : 'cyan'} blink />
            <span className="font-[family-name:var(--font-pixel)]">{launch.status}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
