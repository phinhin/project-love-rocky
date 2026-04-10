import { NextResponse } from 'next/server';
import { getUpcomingLaunches } from '@/lib/launches';
import { getTrackerSnapshot } from '@/lib/tracker';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const progress = Number(searchParams.get('progress') ?? '0.62');
    const launchId = searchParams.get('launchId');
    const launches = await getUpcomingLaunches(10);
    const launch = launchId ? launches.find((item) => item.id === launchId) : launches[0];

    if (!launch) {
      return NextResponse.json({ error: 'No launch available for tracker' }, { status: 404 });
    }

    return NextResponse.json({ snapshot: getTrackerSnapshot(launch, progress) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown tracker error' },
      { status: 500 }
    );
  }
}
