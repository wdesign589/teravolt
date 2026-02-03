import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';

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

// POST: Approve KYC for a user (without requiring documents)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('🔵 [Approve KYC] Request received');
    
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      console.log('❌ [Approve KYC] Unauthorized - not admin');
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    console.log('✅ [Approve KYC] Admin verified');

    const { id } = await params;
    console.log('🆔 [Approve KYC] User ID:', id);

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');

    // Get user first
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    
    if (!user) {
      console.log('❌ [Approve KYC] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('📊 [Approve KYC] Current KYC status:', user.kycStatus);

    // Check if user already has approved KYC
    if (user.kycStatus === 'approved') {
      return NextResponse.json(
        { error: 'User KYC is already approved' },
        { status: 400 }
      );
    }

    // Update KYC status to approved
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          kycStatus: 'approved',
          updatedAt: new Date(),
        }
      }
    );

    if (result.matchedCount === 0) {
      console.log('❌ [Approve KYC] Update failed - user not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('✅ [Approve KYC] KYC approved successfully');

    return NextResponse.json({
      success: true,
      message: 'KYC approved successfully',
    });

  } catch (error) {
    console.error('❌ [Approve KYC] Error:', error);
    return NextResponse.json(
      { error: 'Failed to approve KYC' },
      { status: 500 }
    );
  }
}
