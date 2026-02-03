import { ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Address Information
  address: string;
  city: string;
  postalCode: string;
  country: string;
  
  // Financial Preferences (Optional)
  investmentAmount?: string;
  investmentExperience?: string;
  investmentGoal?: string;
  
  // Security
  password: string; // Hashed
  
  // Account Status
  role: 'user' | 'admin';
  kycStatus: 'not_submitted' | 'pending' | 'approved' | 'rejected';
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  
  // Wallet & Balance
  balance: number;
  walletAddress?: string;
  
  // Dashboard Statistics (optional, will default to 0)
  totalIncome?: number;
  totalSpent?: number;
  totalInvestments?: number;
  totalProfit?: number;
  totalDeposits?: number;
  totalWithdrawals?: number;
  
  // KYC Documents
  kycDocuments?: {
    idFront: string;
    idBack: string;
    proofOfAddress: string;
    submittedAt: Date;
    reviewedAt?: Date;
    rejectionReason?: string;
  };
  
  // Metadata
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  
  // Allow for future dynamic fields
  [key: string]: any;
}

// Validation helper
export function validateUserData(data: Partial<UserDocument>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required fields validation
  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.phone?.trim()) errors.push('Phone number is required');
  if (!data.dateOfBirth) errors.push('Date of birth is required');
  if (!data.address?.trim()) errors.push('Address is required');
  if (!data.city?.trim()) errors.push('City is required');
  if (!data.postalCode?.trim()) errors.push('Postal code is required');
  if (!data.country) errors.push('Country is required');
  if (!data.password) errors.push('Password is required');
  
  // Email format validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  // Password strength validation
  if (data.password) {
    if (data.password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(data.password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(data.password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(data.password)) {
      errors.push('Password must contain at least one number');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Create user document
export function createUserDocument(data: Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt' | 'balance' | 'role' | 'kycStatus' | 'emailVerified'>): Omit<UserDocument, '_id'> {
  return {
    ...data,
    role: 'user',
    kycStatus: 'not_submitted',
    emailVerified: false,
    balance: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
