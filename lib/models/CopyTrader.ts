import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';

export interface CopyTrader {
  _id?: ObjectId;
  name: string;
  avatar: string; // Cloudinary URL
  roi: number; // e.g., 127 for 127%
  followers: string; // e.g., "2.4k"
  winRate: number; // e.g., 89 for 89%
  trades: number;
  badge: 'Elite' | 'Pro' | 'Expert' | string; // Allow custom badges
  risk: 'Low' | 'Medium' | 'High';
  avgProfit: number; // e.g., 245 for $245
  totalReturn: number; // e.g., 12450 for $12,450
  monthlyReturn: number; // e.g., 42 for 42%
  percentageGainPerDay: number; // Hidden from users, set by admin (e.g., 0.5 for 0.5% per day)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getCopyTradersCollection() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME);
  return db.collection<CopyTrader>('copyTraders');
}

// Get all active copy traders
export async function getActiveCopyTraders() {
  const collection = await getCopyTradersCollection();
  return collection.find({ isActive: true }).sort({ roi: -1 }).toArray();
}

// Get all copy traders (admin)
export async function getAllCopyTraders() {
  const collection = await getCopyTradersCollection();
  return collection.find({}).sort({ createdAt: -1 }).toArray();
}

// Get single trader by ID
export async function getCopyTraderById(id: string) {
  try {
    console.log('🔍 [Model] getCopyTraderById called with ID:', id);
    console.log('📏 [Model] ID length:', id.length);
    console.log('🔤 [Model] ID type:', typeof id);
    
    const collection = await getCopyTradersCollection();
    const objectId = new ObjectId(id);
    console.log('✅ [Model] ObjectId created:', objectId.toString());
    
    const trader = await collection.findOne({ _id: objectId });
    console.log('📊 [Model] Query result:', trader ? 'FOUND' : 'NOT FOUND');
    
    return trader;
  } catch (error) {
    console.error('❌ [Model] Error in getCopyTraderById:', error);
    console.error('❌ [Model] Failed ID:', id);
    throw error;
  }
}

// Create new trader
export async function createCopyTrader(trader: Omit<CopyTrader, '_id' | 'createdAt' | 'updatedAt'>) {
  const collection = await getCopyTradersCollection();
  const result = await collection.insertOne({
    ...trader,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result;
}

// Update trader
export async function updateCopyTrader(id: string, updates: Partial<CopyTrader>) {
  const collection = await getCopyTradersCollection();
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

// Delete trader
export async function deleteCopyTrader(id: string) {
  const collection = await getCopyTradersCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}
