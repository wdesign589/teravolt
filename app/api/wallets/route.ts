import { NextResponse } from 'next/server';
import { getActiveWallets } from '@/lib/models/Wallet';

// GET: Get all active wallets (public for authenticated users)
export async function GET() {
  try {
    const wallets = await getActiveWallets();
    
    return NextResponse.json({ wallets });
  } catch (error) {
    console.error('[Wallets GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallets' },
      { status: 500 }
    );
  }
}
