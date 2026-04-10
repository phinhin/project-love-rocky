import type { LaunchCard } from '@/lib/types';
import { TrackerConsole } from '@/components/tracker-console';

export function TrackerPanel({ launch }: { launch: LaunchCard }) {
  return <TrackerConsole launch={launch} />;
}
