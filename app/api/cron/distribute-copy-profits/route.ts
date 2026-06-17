import { NextRequest, NextResponse } from 'next/server';
import { distributeCopyTradingProfits } from '@/lib/cron/distribute-copy-trading-profits';
import { verifyCronRequest } from '@/lib/cron/verify-cron-auth';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const auth = verifyCronRequest(request);

  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const summary = await distributeCopyTradingProfits();

    return NextResponse.json({
      success: true,
      job: 'distribute-copy-profits',
      ranAt: new Date().toISOString(),
      summary,
    });
  } catch (error) {
    console.error('Copy trading profit cron failed:', error);
    return NextResponse.json(
      { error: 'Copy trading profit distribution failed' },
      { status: 500 }
    );
  }
}
