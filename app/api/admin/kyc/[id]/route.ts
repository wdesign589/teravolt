import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { UserDocument } from '@/lib/models/User';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

/**
 * PATCH /api/admin/kyc/[id]
 * Approve or reject KYC submission
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify token and check if admin
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
    
    // Check if user is admin
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    const adminUser = await usersCollection.findOne({ 
      _id: new ObjectId(decoded.userId),
      role: 'admin'
    });
    
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const { action, rejectionReason } = body; // action: 'approve' | 'reject'
    
    if (!action || (action !== 'approve' && action !== 'reject')) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      );
    }
    
    if (action === 'reject' && !rejectionReason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      );
    }
    
    const { id } = await context.params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    // Update user KYC status
    const updateData: any = {
      kycStatus: action === 'approve' ? 'approved' : 'rejected',
      updatedAt: new Date(),
      'kycDocuments.reviewedAt': new Date(),
    };
    
    if (action === 'reject' && rejectionReason) {
      updateData['kycDocuments.rejectionReason'] = rejectionReason;
    }
    
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `KYC ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
    });
    
  } catch (error) {
    console.error('KYC approval/rejection error:', error);
    return NextResponse.json(
      { error: 'Failed to update KYC status' },
      { status: 500 }
    );
  }
}
