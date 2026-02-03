import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import {
  InvestmentPlan,
  validateInvestmentPlan,
  createInvestmentPlanDocument,
} from '@/lib/models/Investment';

/**
 * GET /api/admin/investments
 * Get all investment plans
 */
export async function GET(request: NextRequest) {
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

    const db = await getDatabase();
    const investments = await db
      .collection<InvestmentPlan>('investmentPlans')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert ObjectId to string for JSON serialization
    const serializedInvestments = investments.map((inv) => ({
      ...inv,
      _id: inv._id?.toString(),
      createdBy: inv.createdBy?.toString(),
      createdAt: inv.createdAt.toISOString(),
      updatedAt: inv.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      investments: serializedInvestments,
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/investments
 * Create new investment plan
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();

    // Validate investment plan data
    const validation = validateInvestmentPlan(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    // Create investment plan document
    const investmentPlan = createInvestmentPlanDocument({
      name: body.name,
      description: body.description,
      minimumAmount: Number(body.minimumAmount),
      maximumAmount: Number(body.maximumAmount),
      durationDays: Number(body.durationDays),
      percentageReturn: Number(body.percentageReturn),
      isActive: body.isActive !== undefined ? body.isActive : true,
      features: body.features || [],
      risk: body.risk,
      category: body.category || '',
      createdBy: new ObjectId(decoded.userId),
    });

    const db = await getDatabase();
    const result = await db
      .collection<InvestmentPlan>('investmentPlans')
      .insertOne(investmentPlan);

    return NextResponse.json({
      success: true,
      message: 'Investment plan created successfully',
      investmentId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json(
      { error: 'Failed to create investment plan' },
      { status: 500 }
    );
  }
}
