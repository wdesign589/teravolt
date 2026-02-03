import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { UserDocument } from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * POST /api/kyc/submit
 * Submit KYC documents for verification
 */
export async function POST(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify token
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
    
    // Get form data
    const formData = await request.formData();
    const idFront = formData.get('idFront') as File;
    const idBack = formData.get('idBack') as File;
    const proofOfAddress = formData.get('proofOfAddress') as File;
    
    // Validation
    if (!idFront || !idBack || !proofOfAddress) {
      return NextResponse.json(
        { error: 'All documents are required' },
        { status: 400 }
      );
    }
    
    // Upload to Cloudinary
    const uploadToCloudinary = async (file: File, folder: string) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: `lunex/kyc/${decoded.userId}/${folder}`,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
    };
    
    // Upload all documents
    const [idFrontResult, idBackResult, proofOfAddressResult] = await Promise.all([
      uploadToCloudinary(idFront, 'id-front'),
      uploadToCloudinary(idBack, 'id-back'),
      uploadToCloudinary(proofOfAddress, 'proof-of-address'),
    ]);
    
    // Save to database
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(decoded.userId) },
      {
        $set: {
          kycStatus: 'pending',
          kycDocuments: {
            idFront: (idFrontResult as any).secure_url,
            idBack: (idBackResult as any).secure_url,
            proofOfAddress: (proofOfAddressResult as any).secure_url,
            submittedAt: new Date(),
          },
          updatedAt: new Date(),
        },
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'KYC documents submitted successfully',
    });
    
  } catch (error) {
    console.error('KYC submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit KYC documents' },
      { status: 500 }
    );
  }
}
