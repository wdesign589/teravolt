import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import {
  getCopyTraderById,
  updateCopyTrader,
  deleteCopyTrader,
} from '@/lib/models/CopyTrader';

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

// GET: Fetch single trader by ID
export async function GET(
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
    const trader = await getCopyTraderById(id);

    if (!trader) {
      return NextResponse.json(
        { error: 'Trader not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      trader: {
        ...trader,
        _id: trader._id?.toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching trader:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trader' },
      { status: 500 }
    );
  }
}

// PUT: Update trader
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('🔵 [PUT] Update trader called');
    
    // Await params first (Next.js 15 requirement)
    const { id } = await params;
    console.log('🆔 [PUT] Trader ID:', id);
    
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    console.log('✅ [PUT] Admin verified');

    const body = await request.json();
    console.log('📦 [PUT] Request body:', body);

    // Check if trader exists
    console.log('🔍 [PUT] Checking if trader exists with ID:', id);
    const existingTrader = await getCopyTraderById(id);
    console.log('📊 [PUT] Existing trader:', existingTrader ? 'FOUND' : 'NOT FOUND');
    
    if (!existingTrader) {
      console.error('❌ [PUT] Trader not found with ID:', id);
      return NextResponse.json(
        { error: 'Trader not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ [PUT] Trader exists, proceeding with update');

    // Validate number fields if provided
    const numberFields = ['roi', 'winRate', 'trades', 'avgProfit', 'totalReturn', 'monthlyReturn', 'percentageGainPerDay'];
    for (const field of numberFields) {
      if (body[field] !== undefined && (typeof body[field] !== 'number' || isNaN(body[field]))) {
        return NextResponse.json(
          { error: `${field} must be a valid number` },
          { status: 400 }
        );
      }
    }

    // Validate risk level if provided
    if (body.risk && !['Low', 'Medium', 'High'].includes(body.risk)) {
      return NextResponse.json(
        { error: 'Risk must be Low, Medium, or High' },
        { status: 400 }
      );
    }

    const result = await updateCopyTrader(id, body);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Trader not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Trader updated successfully',
    });
  } catch (error) {
    console.error('Error updating trader:', error);
    return NextResponse.json(
      { error: 'Failed to update trader' },
      { status: 500 }
    );
  }
}

// DELETE: Delete trader
export async function DELETE(
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
    const result = await deleteCopyTrader(id);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Trader not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Trader deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting trader:', error);
    return NextResponse.json(
      { error: 'Failed to delete trader' },
      { status: 500 }
    );
  }
}
