import { NextResponse } from 'next/server';
import { getLaunchById } from '@/lib/launches';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const launch = await getLaunchById(id);
    if (!launch) {
      return NextResponse.json({ error: 'Launch not found' }, { status: 404 });
    }

    return NextResponse.json({ launch });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown launch error' },
      { status: 500 }
    );
  }
}
