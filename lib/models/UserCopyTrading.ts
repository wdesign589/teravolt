import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';

export interface UserCopyTrading {
  _id?: ObjectId;
  userId: ObjectId;
  traderId: ObjectId;
  traderName: string; // Cached for quick display
  allocatedAmount: number;
  totalEarned: number;
  startDate: Date;
  lastProfitDate?: Date; // Track last time profit was distributed
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserCopyTradingCollection() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME);
  return db.collection<UserCopyTrading>('userCopyTrading');
}

// Get user's active copy trading
export async function getUserActiveCopyTrading(userId: string) {
  console.log('🔍 [Model] getUserActiveCopyTrading called');
  console.log('   User ID:', userId);
  console.log('   User ID type:', typeof userId);
  console.log('   User ID length:', userId.length);
  
  const collection = await getUserCopyTradingCollection();
  const objectId = new ObjectId(userId);
  
  console.log('   ObjectId created:', objectId.toString());
  console.log('   Query:', { userId: objectId, status: 'active' });
  
  const result = await collection.findOne({
    userId: objectId,
    status: 'active',
  });
  
  console.log('   Result:', result ? 'FOUND' : 'NOT FOUND');
  if (result) {
    console.log('   Found record:', {
      id: result._id?.toString(),
      trader: result.traderName,
      status: result.status,
      amount: result.allocatedAmount
    });
  }
  
  return result;
}

// Get all user's copy trading history
export async function getUserCopyTradingHistory(userId: string) {
  const collection = await getUserCopyTradingCollection();
  return collection.find({ userId: new ObjectId(userId) }).sort({ createdAt: -1 }).toArray();
}

// Create new copy trading
export async function createUserCopyTrading(data: Omit<UserCopyTrading, '_id' | 'totalEarned' | 'createdAt' | 'updatedAt'>) {
  const collection = await getUserCopyTradingCollection();
  const result = await collection.insertOne({
    ...data,
    totalEarned: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result;
}

// Update copy trading
export async function updateUserCopyTrading(id: string, updates: Partial<UserCopyTrading>) {
  const collection = await getUserCopyTradingCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: {
        ...updates,
        updatedAt: new Date(),
      }
    }
  );
  return result;
}

// Stop copy trading (set to inactive)
export async function stopUserCopyTrading(userId: string, session?: any) {
  const collection = await getUserCopyTradingCollection();
  const options = session ? { session } : {};
  const result = await collection.updateOne(
    { userId: new ObjectId(userId), status: 'active' },
    { 
      $set: {
        status: 'inactive',
        updatedAt: new Date(),
      }
    },
    options
  );
  return result;
}

// Get all active copy traders (for cron job)
export async function getAllActiveCopyTradings() {
  const collection = await getUserCopyTradingCollection();
  return collection.find({ status: 'active' }).toArray();
}

// Add profit to user's copy trading
export async function addProfitToCopyTrading(id: string, profitAmount: number) {
  const collection = await getUserCopyTradingCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { 
      $inc: { totalEarned: profitAmount },
      $set: { 
        lastProfitDate: new Date(),
        updatedAt: new Date(),
      }
    }
  );
  return result;
}
