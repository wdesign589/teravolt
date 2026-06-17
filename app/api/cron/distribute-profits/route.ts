import { NextRequest, NextResponse } from 'next/server';
import { distributeInvestmentProfits } from '@/lib/cron/distribute-investment-profits';
import { verifyCronRequest } from '@/lib/cron/verify-cron-auth';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const auth = verifyCronRequest(request);

  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const summary = await distributeInvestmentProfits();

    return NextResponse.json({
      success: true,
      job: 'distribute-profits',
      ranAt: new Date().toISOString(),
      summary,
    });
  } catch (error) {
    console.error('Investment profit cron failed:', error);
    return NextResponse.json(
      { error: 'Investment profit distribution failed' },
      { status: 500 }
    );
  }
}
