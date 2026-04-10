'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { PixelButton, PixelLabel, PixelPanel, StatusLight } from '@/components/pixel-ui';
import type { LaunchCard } from '@/lib/types';
import { getTrackerSnapshot } from '@/lib/tracker';

export function TrackerConsole({ launch }: { launch: LaunchCard }) {
  const [progress, setProgress] = useState(0.62);
  const [view, setView] = useState<'earth' | 'solar'>('earth');
  const snapshot = useMemo(() => getTrackerSnapshot(launch, progress), [launch, progress]);

  const trackerStats = [
    ['Mission', snapshot.missionName],
    ['Speed', `${snapshot.speedKmS} km/s`],
    ['Altitude', `${snapshot.altitudeKm} km`],
    ['Flight phase', snapshot.phaseLabel],
    ['Downrange', `${snapshot.downrangeKm} km`],
    ['Orbit', snapshot.orbit],
    ['Provider', snapshot.provider]
  ];

  return (
    <PixelPanel tone="pink" className="p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <PixelLabel className="text-pixelCyan">Interactive Mission Tracker</PixelLabel>
          <h2 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase leading-[1.5] md:text-3xl">Solar System Trajectory View</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <PixelButton label="Earth Orbit" tone={view === 'earth' ? 'cyan' : 'slate'} onClick={() => setView('earth')} />
          <PixelButton label="Solar System" tone={view === 'solar' ? 'yellow' : 'slate'} onClick={() => setView('solar')} />
        </div>
      </div>

      <div className="mt-6 border-2 border-steel bg-panel p-4 shadow-pixelSm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <PixelLabel className="text-pixelGold">Replay scrubber</PixelLabel>
            <div className="mt-2 text-sm uppercase text-parchment">{Math.round(progress * 100)}% mission progress</div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(progress * 100)}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setProgress(Number(event.target.value) / 100)}
            className="w-full accent-cyan-300 md:max-w-md"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="relative min-h-[420px] overflow-hidden border-4 border-pixelCyan bg-[#0a101d] shadow-pixel">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#7cf7ff 1px, transparent 1px), linear-gradient(90deg, #7cf7ff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="radar-sweep absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 border-4 border-pixelCyan bg-[#3a86ff] shadow-[0_0_0_4px_#173a46]" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-pixelCyan" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-pixelPink" />
          {view === 'solar' ? <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-pixelGold" /> : null}

          <div
            className="blink-slow absolute h-3 w-3 bg-parchment shadow-[0_0_0_2px_#182033]"
            style={{
              left: `${50 + Math.cos(progress * Math.PI * 2) * (view === 'solar' ? 30 : 20)}%`,
              top: `${50 + Math.sin(progress * Math.PI * 2) * (view === 'solar' ? 30 : 20)}%`
            }}
          />

          <div className="absolute left-4 top-4 inline-flex items-center gap-2 border-2 border-pixelGreen bg-[#102014] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-pixelGreen shadow-pixelSm">
            <StatusLight color="green" blink />
            <span className="font-[family-name:var(--font-pixel)]">Radar Online</span>
          </div>
          <div className="absolute right-4 top-4 border-2 border-pixelGold bg-[#19150f] px-3 py-2 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.14em] text-pixelGold shadow-pixelSm">
            {view === 'solar' ? 'Solar Map' : 'Earth Orbit'}
          </div>
          <div className="absolute bottom-4 left-4 border-2 border-steel bg-panel px-3 py-2 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.16em] text-[#d9d4b8] shadow-pixelSm">
            {snapshot.phaseLabel}
          </div>
        </div>

        <div className="space-y-4">
          {trackerStats.map(([label, value], index) => (
            <div key={label} className="border-2 border-steel bg-panel p-4 shadow-pixelSm">
              <div className="flex items-center gap-2">
                <StatusLight color={index % 3 === 0 ? 'cyan' : index % 3 === 1 ? 'pink' : 'yellow'} blink={index < 2} />
                <PixelLabel className="text-pixelGold">{label}</PixelLabel>
              </div>
              <div className="mt-3 text-sm font-bold uppercase text-parchment md:text-base">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </PixelPanel>
  );
}
