import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getAllWallets, upsertWallet } from '@/lib/models/Wallet';

const JWT_SECRET = process.env.JWT_SECRET || '';

// Verify admin middleware
async function verifyAdmin(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role?: string };
    
    if (decoded.role !== 'admin') {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

// GET: Get all wallets
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const wallets = await getAllWallets();
    
    return NextResponse.json({ wallets });
  } catch (error) {
    console.error('[Wallets GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallets' },
      { status: 500 }
    );
  }
}

// POST: Create or update wallet
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { symbol, name, address, qrCodeUrl, network, isActive } = body;

    // Validation
    if (!symbol || !name || !address) {
      return NextResponse.json(
        { error: 'Symbol, name, and address are required' },
        { status: 400 }
      );
    }

    const validSymbols = ['BTC', 'ETH', 'USDT_TRC20', 'USDT_ERC20'];
    if (!validSymbols.includes(symbol)) {
      return NextResponse.json(
        { error: 'Invalid symbol. Must be one of: BTC, ETH, USDT_TRC20, USDT_ERC20' },
        { status: 400 }
      );
    }

    const wallet = {
      symbol,
      name,
      address,
      qrCodeUrl: qrCodeUrl || '',
      network: network || '',
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const walletId = await upsertWallet(wallet);
    
    return NextResponse.json({
      success: true,
      message: 'Wallet saved successfully',
      walletId,
    });
  } catch (error) {
    console.error('[Wallets POST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to save wallet' },
      { status: 500 }
    );
  }
}
