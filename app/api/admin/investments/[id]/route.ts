import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import {
  InvestmentPlan,
  validateInvestmentPlan,
  calculateDailyReturn,
} from '@/lib/models/Investment';

/**
 * PUT /api/admin/investments/[id]
 * Update investment plan
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized. Admin access required.' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    // Validate investment plan data
    const validation = validateInvestmentPlan(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    // Calculate daily return
    const dailyReturn = calculateDailyReturn(
      Number(body.percentageReturn),
      Number(body.durationDays)
    );

    const db = await getDatabase();
    const result = await db
      .collection<InvestmentPlan>('investmentPlans')
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: body.name,
            description: body.description,
            minimumAmount: Number(body.minimumAmount),
            maximumAmount: Number(body.maximumAmount),
            durationDays: Number(body.durationDays),
            percentageReturn: Number(body.percentageReturn),
            dailyReturn,
            isActive: body.isActive,
            features: body.features || [],
            risk: body.risk,
            category: body.category || '',
            updatedAt: new Date(),
          },
        }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Investment plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Investment plan updated successfully',
    });
  } catch (error) {
    console.error('Error updating investment:', error);
    return NextResponse.json(
      { error: 'Failed to update investment plan' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/investments/[id]
 * Delete investment plan
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized. Admin access required.' },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const db = await getDatabase();
    
    // Check if there are active user investments
    const activeInvestments = await db
      .collection('userInvestments')
      .countDocuments({
        investmentPlanId: new ObjectId(id),
        status: 'active',
      });

    if (activeInvestments > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete investment plan with active user investments',
          activeInvestments,
        },
        { status: 400 }
      );
    }

    const result = await db
      .collection<InvestmentPlan>('investmentPlans')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Investment plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Investment plan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting investment:', error);
    return NextResponse.json(
      { error: 'Failed to delete investment plan' },
      { status: 500 }
    );
  }
}
