import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import {
  getAllCopyTraders,
  createCopyTrader,
  CopyTrader,
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

// GET: Fetch all copy traders (admin only)
export async function GET(request: NextRequest) {
  console.log('🔵 [Admin API] GET /api/admin/copy-traders called');
  
  try {
    console.log('🔐 [Admin API] Verifying admin...');
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      console.log('❌ [Admin API] Not authorized - admin verification failed');
      console.log('🍪 [Admin API] Cookies:', request.cookies.getAll().map(c => c.name));
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    console.log('✅ [Admin API] Admin verified:', admin.userId, 'Role:', admin.role);
    console.log('📊 [Admin API] Fetching traders from database...');
    
    const traders = await getAllCopyTraders();
    console.log('📈 [Admin API] Found', traders.length, 'traders in database');
    
    const formattedTraders = traders.map(trader => ({
      ...trader,
      _id: trader._id?.toString(),
    }));
    
    // Log first trader to see format
    if (formattedTraders.length > 0) {
      console.log('📋 [Admin API] Sample trader _id:', formattedTraders[0]._id);
      console.log('📋 [Admin API] Sample trader _id type:', typeof formattedTraders[0]._id);
    }

    return NextResponse.json({
      success: true,
      traders: formattedTraders,
    });
  } catch (error) {
    console.error('Error fetching copy traders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch copy traders' },
      { status: 500 }
    );
  }
}

// POST: Create new copy trader (admin only)
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

    // Validate required fields
    const requiredFields = [
      'name', 'avatar', 'roi', 'followers', 'winRate', 'trades',
      'badge', 'risk', 'avgProfit', 'totalReturn', 'monthlyReturn', 'percentageGainPerDay'
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate number fields
    const numberFields = ['roi', 'winRate', 'trades', 'avgProfit', 'totalReturn', 'monthlyReturn', 'percentageGainPerDay'];
    for (const field of numberFields) {
      if (typeof body[field] !== 'number' || isNaN(body[field])) {
        return NextResponse.json(
          { error: `${field} must be a valid number` },
          { status: 400 }
        );
      }
    }

    // Validate risk level
    if (!['Low', 'Medium', 'High'].includes(body.risk)) {
      return NextResponse.json(
        { error: 'Risk must be Low, Medium, or High' },
        { status: 400 }
      );
    }

    const traderData: Omit<CopyTrader, '_id' | 'createdAt' | 'updatedAt'> = {
      name: body.name,
      avatar: body.avatar,
      roi: body.roi,
      followers: body.followers,
      winRate: body.winRate,
      trades: body.trades,
      badge: body.badge,
      risk: body.risk,
      avgProfit: body.avgProfit,
      totalReturn: body.totalReturn,
      monthlyReturn: body.monthlyReturn,
      percentageGainPerDay: body.percentageGainPerDay,
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    const result = await createCopyTrader(traderData);

    return NextResponse.json({
      success: true,
      message: 'Copy trader created successfully',
      traderId: result.insertedId.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating copy trader:', error);
    return NextResponse.json(
      { error: 'Failed to create copy trader' },
      { status: 500 }
    );
  }
}
