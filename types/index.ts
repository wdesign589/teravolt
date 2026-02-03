export interface User {
  id: string;
  // Personal Information
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  avatar?: string;
  
  // Address Information
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  
  // Account Information
  role: 'user' | 'admin';
  kycStatus: 'not_submitted' | 'pending' | 'approved' | 'rejected';
  emailVerified: boolean;
  
  // Financial Information
  balance: number;
  walletAddress?: string;
  
  // Investment Preferences
  investmentAmount?: string;
  investmentExperience?: string;
  investmentGoal?: string;
  
  // Dashboard Statistics (will default to 0 if not present)
  totalIncome?: number;
  totalSpent?: number;
  totalInvestments?: number;
  totalProfit?: number;
  totalDeposits?: number;
  totalWithdrawals?: number;
  
  // Copy Trading Data
  copyTraders?: CopyTraderFormatted[];
  activeCopyTrading?: {
    traderId: string;
    traderName: string;
    allocatedAmount: number;
    totalEarned: number;
    startDate: Date;
  } | null;
  
  // Timestamps
  createdAt: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  
  // Future fields - add here as needed
  // transactions?: Transaction[];
  // investments?: Investment[];
  // referralCode?: string;
  // referredBy?: string;
  [key: string]: any; // Allow for dynamic future fields
}

export interface Investment {
  id: string;
  userId: string;
  amount: number;
  cryptocurrency: string;
  status: 'active' | 'completed' | 'cancelled';
  profit: number;
  startDate: Date;
  endDate?: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'investment' | 'profit';
  amount: number;
  cryptocurrency?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface CopyTrader {
  id: string;
  name: string;
  avatar?: string;
  winRate: number;
  totalProfit: number;
  followers: number;
  riskLevel: 'low' | 'medium' | 'high';
  minInvestment: number;
}

export interface CopyTraderFormatted {
  id: string;
  name: string;
  avatar: string;
  roi: string;
  followers: string;
  winRate: string;
  trades: number;
  badge: string;
  risk: 'Low' | 'Medium' | 'High';
  avgProfit: string;
  totalReturn: string;
  monthlyReturn: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  cryptocurrency: string;
  address?: string;
}

export interface KYCDocument {
  id: string;
  userId: string;
  documentType: 'passport' | 'id-card' | 'drivers-license' | 'proof-of-address';
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
}
