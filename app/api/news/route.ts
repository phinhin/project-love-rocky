import { NextResponse } from 'next/server';
import { getNewsStories } from '@/lib/news';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit') ?? '18');
    const stories = await getNewsStories(Number.isFinite(limit) ? limit : 18);
    return NextResponse.json({ stories });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown news error' },
      { status: 500 }
    );
  }
}
