import type { LaunchCard } from '@/lib/types';

export type TrackerSnapshot = {
  missionName: string;
  provider: string;
  orbit: string;
  phaseLabel: string;
  progress: number;
  altitudeKm: number;
  speedKmS: number;
  downrangeKm: number;
};

const PHASES = [
  { until: 0.15, label: 'Terminal count', altitude: [0, 1], speed: [0, 0.1], downrange: [0, 0.2] },
  { until: 0.38, label: 'Max-Q ascent', altitude: [1, 70], speed: [0.1, 2.2], downrange: [0.2, 60] },
  { until: 0.58, label: 'First-stage boost', altitude: [70, 120], speed: [2.2, 4.5], downrange: [60, 180] },
  { until: 0.78, label: 'Second-stage burn', altitude: [120, 220], speed: [4.5, 6.9], downrange: [180, 620] },
  { until: 1, label: 'Orbital insertion', altitude: [220, 540], speed: [6.9, 7.8], downrange: [620, 1600] }
] as const;

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function getTrackerSnapshot(launch: LaunchCard, progress = 0.62): TrackerSnapshot {
  const clamped = Math.min(1, Math.max(0, progress));
  let prevUntil = 0;
  const phase = PHASES.find((item) => clamped <= item.until) ?? PHASES[PHASES.length - 1];
  for (const item of PHASES) {
    if (item === phase) break;
    prevUntil = item.until;
  }

  const adjustedLocalT = (clamped - prevUntil) / (phase.until - prevUntil || 1);

  return {
    missionName: launch.name,
    provider: launch.provider,
    orbit: launch.orbit ?? 'LEO',
    phaseLabel: phase.label,
    progress: clamped,
    altitudeKm: Number(lerp(phase.altitude[0], phase.altitude[1], adjustedLocalT).toFixed(1)),
    speedKmS: Number(lerp(phase.speed[0], phase.speed[1], adjustedLocalT).toFixed(2)),
    downrangeKm: Number(lerp(phase.downrange[0], phase.downrange[1], adjustedLocalT).toFixed(0))
  };
}
