import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';

export interface Wallet {
  _id?: ObjectId;
  symbol: 'BTC' | 'ETH' | 'USDT_TRC20' | 'USDT_ERC20';
  name: string;
  address: string;
  qrCodeUrl: string;
  network?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function createWalletDocument(data: Omit<Wallet, '_id' | 'createdAt' | 'updatedAt'>): Wallet {
  return {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// Get all wallets
export async function getAllWallets(): Promise<Wallet[]> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const walletsCollection = db.collection<Wallet>('wallets');

    const wallets = await walletsCollection
      .find({})
      .sort({ symbol: 1 })
      .toArray();

    return wallets;
  } catch (error) {
    console.error('Error fetching wallets:', error);
    throw error;
  }
}

// Get active wallets only
export async function getActiveWallets(): Promise<Wallet[]> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const walletsCollection = db.collection<Wallet>('wallets');

    const wallets = await walletsCollection
      .find({ isActive: true })
      .sort({ symbol: 1 })
      .toArray();

    return wallets;
  } catch (error) {
    console.error('Error fetching active wallets:', error);
    throw error;
  }
}

// Get wallet by ID
export async function getWalletById(id: string): Promise<Wallet | null> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const walletsCollection = db.collection<Wallet>('wallets');

    const wallet = await walletsCollection.findOne({ _id: new ObjectId(id) });
    return wallet;
  } catch (error) {
    console.error('Error fetching wallet by ID:', error);
    throw error;
  }
}

// Get wallet by symbol
export async function getWalletBySymbol(symbol: string): Promise<Wallet | null> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const walletsCollection = db.collection<Wallet>('wallets');

    const wallet = await walletsCollection.findOne({ symbol: symbol as Wallet['symbol'] });
    return wallet;
  } catch (error) {
    console.error('Error fetching wallet by symbol:', error);
    throw error;
  }
}

// Update wallet
export async function updateWallet(
  id: string,
  data: Partial<Omit<Wallet, '_id' | 'createdAt'>>
): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const walletsCollection = db.collection<Wallet>('wallets');

    const result = await walletsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    );

    return result.matchedCount > 0;
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
}

// Create or update wallet
export async function upsertWallet(wallet: Wallet): Promise<string> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const walletsCollection = db.collection<Wallet>('wallets');

    // Exclude createdAt from update to prevent conflict
    const { createdAt, ...walletData } = wallet;

    const result = await walletsCollection.updateOne(
      { symbol: wallet.symbol },
      {
        $set: {
          ...walletData,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return result.upsertedId?.toString() || wallet._id?.toString() || '';
  } catch (error) {
    console.error('Error upserting wallet:', error);
    throw error;
  }
}
