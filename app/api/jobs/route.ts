import { NextResponse } from 'next/server';
import { getJobPostings } from '@/lib/jobs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit') ?? '24');
    const jobs = await getJobPostings(Number.isFinite(limit) ? limit : 24);
    return NextResponse.json({ jobs });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown jobs error' },
      { status: 500 }
    );
  }
}
