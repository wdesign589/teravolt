import { Db, ObjectId, ClientSession } from 'mongodb';
import { Transaction } from '@/lib/models/Transaction';

/**
 * Helper function to create a transaction record
 * This can be used by various parts of the application
 */
export async function createTransaction(
  db: Db,
  options: {
    userId: ObjectId;
    type: Transaction['type'];
    amount: number;
    status: Transaction['status'];
    description: string;
    investmentId?: ObjectId;
    investmentPlanName?: string;
    balanceBefore: number;
    balanceAfter: number;
    session?: ClientSession;
  }
): Promise<ObjectId> {
  const now = new Date();

  const transactionDoc: Omit<Transaction, '_id'> = {
    userId: options.userId,
    type: options.type,
    amount: options.amount,
    status: options.status,
    description: options.description,
    balanceBefore: options.balanceBefore,
    balanceAfter: options.balanceAfter,
    createdAt: now,
    updatedAt: now,
  };

  // Add optional investment fields
  if (options.investmentId) {
    transactionDoc.investmentId = options.investmentId;
  }
  if (options.investmentPlanName) {
    transactionDoc.investmentPlanName = options.investmentPlanName;
  }

  const result = await db.collection<Transaction>('transactions').insertOne(
    transactionDoc,
    options.session ? { session: options.session } : undefined
  );

  return result.insertedId;
}

/**
 * Get user's transaction history
 */
export async function getUserTransactions(
  db: Db,
  userId: ObjectId,
  filters?: {
    type?: Transaction['type'];
    status?: Transaction['status'];
    limit?: number;
    skip?: number;
  }
): Promise<{ transactions: Transaction[]; totalCount: number }> {
  const query: any = { userId };
  
  if (filters?.type) {
    query.type = filters.type;
  }
  
  if (filters?.status) {
    query.status = filters.status;
  }

  const limit = filters?.limit || 50;
  const skip = filters?.skip || 0;

  const [transactions, totalCount] = await Promise.all([
    db
      .collection<Transaction>('transactions')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    db
      .collection<Transaction>('transactions')
      .countDocuments(query),
  ]);

  return { transactions, totalCount };
}
