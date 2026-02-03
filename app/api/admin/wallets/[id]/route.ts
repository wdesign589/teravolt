import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getWalletById, updateWallet } from '@/lib/models/Wallet';

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

// PUT: Update wallet
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { symbol, name, address, qrCodeUrl, network, isActive } = body;

    // Check if wallet exists
    const existingWallet = await getWalletById(id);
    if (!existingWallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      );
    }

    // Update wallet
    const updateData: any = {};
    if (symbol !== undefined) updateData.symbol = symbol;
    if (name !== undefined) updateData.name = name;
    if (address !== undefined) updateData.address = address;
    if (qrCodeUrl !== undefined) updateData.qrCodeUrl = qrCodeUrl;
    if (network !== undefined) updateData.network = network;
    if (isActive !== undefined) updateData.isActive = isActive;

    const success = await updateWallet(id, updateData);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update wallet' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Wallet updated successfully',
    });
  } catch (error) {
    console.error('[Wallet PUT] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update wallet' },
      { status: 500 }
    );
  }
}
