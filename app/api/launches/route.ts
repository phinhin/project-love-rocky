import { NextResponse } from 'next/server';
import { getRecentLaunches, getUpcomingLaunches } from '@/lib/launches';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit') ?? '8');
    const scope = searchParams.get('scope') ?? 'upcoming';
    const safeLimit = Number.isFinite(limit) ? limit : 8;
    const launches = scope === 'recent'
      ? await getRecentLaunches(safeLimit)
      : await getUpcomingLaunches(safeLimit);
    return NextResponse.json({ launches });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown launch error' },
      { status: 500 }
    );
  }
}
