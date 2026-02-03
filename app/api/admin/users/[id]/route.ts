import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { UserDocument } from '@/lib/models/User';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

// Get single user
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Format user data
    const formattedUser = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
      role: user.role,
      kycStatus: user.kycStatus,
      emailVerified: user.emailVerified,
      balance: user.balance,
      kycDocuments: user.kycDocuments ? {
        idFront: user.kycDocuments.idFront,
        idBack: user.kycDocuments.idBack,
        proofOfAddress: user.kycDocuments.proofOfAddress,
        submittedAt: user.kycDocuments.submittedAt?.toISOString?.() || user.kycDocuments.submittedAt,
      } : undefined,
      createdAt: user.createdAt,
    };
    
    return NextResponse.json({ user: formattedUser });
    
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// Update user
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await context.params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    // Prepare update data
    const updateData: any = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: body.dateOfBirth,
      address: body.address,
      city: body.city,
      postalCode: body.postalCode,
      country: body.country,
      kycStatus: body.kycStatus,
      emailVerified: body.emailVerified,
      balance: parseFloat(body.balance) || 0,
      walletAddress: body.walletAddress,
      investmentAmount: body.investmentAmount,
      investmentExperience: body.investmentExperience,
      investmentGoal: body.investmentGoal,
      updatedAt: new Date(),
    };
    
    // Hash password if provided
    if (body.password && body.password.trim() !== '') {
      updateData.password = await bcrypt.hash(body.password, 10);
    }
    
    // Update user
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
      message: 'User updated successfully',
    });
    
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    // Delete user
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
