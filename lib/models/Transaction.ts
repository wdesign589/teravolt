import { ObjectId } from 'mongodb';

export interface Transaction {
  _id?: ObjectId;
  userId: ObjectId;
  type: 'deposit' | 'withdrawal' | 'investment' | 'investment_return' | 'investment_completion' | 'copy_trading_return';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'rejected';
  description: string;
  
  // Investment-related fields (optional)
  investmentId?: ObjectId;
  investmentPlanName?: string;
  
  // Deposit/Withdrawal-related fields (optional)
  transactionHash?: string;
  proofUrl?: string;
  walletSymbol?: string;
  adminNotes?: string;
  approvedBy?: ObjectId;
  approvedAt?: Date;
  
  // Metadata
  balanceBefore: number;
  balanceAfter: number;
  createdAt: Date;
  updatedAt: Date;
}
