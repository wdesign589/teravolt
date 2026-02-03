/**
 * Seed Script for Copy Traders
 * Run this script to populate the database with initial copy traders
 * Usage: npx ts-node scripts/seed-copy-traders.ts
 */

import { createCopyTrader, CopyTrader } from '../lib/models/CopyTrader';

// Default avatar SVG (user icon)
const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjM1IiByPSIxOCIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTcwIDc1QzcwIDY1IDE2MCA2NSA1MCA2NSAzMCA2NSAzMCA2NSAzMCA3NSIgZmlsbD0id2hpdGUiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCIgeTI9IjEwMCI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4YjVjZjYiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZWM0ODk5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+';

const sampleTraders: Omit<CopyTrader, '_id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Alex Chen',
    avatar: DEFAULT_AVATAR,
    roi: 127,
    followers: '2.4k',
    winRate: 89,
    trades: 324,
    badge: 'Elite',
    risk: 'Medium',
    avgProfit: 245,
    totalReturn: 12450,
    monthlyReturn: 42,
    percentageGainPerDay: 0.8, // 0.8% per day
    isActive: true,
  },
  {
    name: 'Sarah Miller',
    avatar: DEFAULT_AVATAR,
    roi: 95,
    followers: '1.8k',
    winRate: 85,
    trades: 256,
    badge: 'Pro',
    risk: 'Low',
    avgProfit: 198,
    totalReturn: 9850,
    monthlyReturn: 31,
    percentageGainPerDay: 0.6, // 0.6% per day
    isActive: true,
  },
  {
    name: 'Mike Johnson',
    avatar: DEFAULT_AVATAR,
    roi: 83,
    followers: '1.5k',
    winRate: 82,
    trades: 198,
    badge: 'Pro',
    risk: 'Medium',
    avgProfit: 176,
    totalReturn: 8340,
    monthlyReturn: 27,
    percentageGainPerDay: 0.55, // 0.55% per day
    isActive: true,
  },
  {
    name: 'Emma Davis',
    avatar: DEFAULT_AVATAR,
    roi: 76,
    followers: '1.2k',
    winRate: 80,
    trades: 187,
    badge: 'Pro',
    risk: 'Low',
    avgProfit: 162,
    totalReturn: 7560,
    monthlyReturn: 25,
    percentageGainPerDay: 0.5, // 0.5% per day
    isActive: true,
  },
  {
    name: 'James Wilson',
    avatar: DEFAULT_AVATAR,
    roi: 112,
    followers: '980',
    winRate: 78,
    trades: 156,
    badge: 'Expert',
    risk: 'High',
    avgProfit: 220,
    totalReturn: 11200,
    monthlyReturn: 37,
    percentageGainPerDay: 1.2, // 1.2% per day - higher risk, higher reward
    isActive: true,
  },
  {
    name: 'Lisa Anderson',
    avatar: DEFAULT_AVATAR,
    roi: 61,
    followers: '850',
    winRate: 76,
    trades: 143,
    badge: 'Expert',
    risk: 'Medium',
    avgProfit: 134,
    totalReturn: 6120,
    monthlyReturn: 20,
    percentageGainPerDay: 0.4, // 0.4% per day
    isActive: true,
  },
];

async function seedCopyTraders() {
  try {
    console.log('🌱 Starting to seed copy traders...\n');

    for (const trader of sampleTraders) {
      console.log(`📊 Creating trader: ${trader.name}`);
      const result = await createCopyTrader(trader);
      console.log(`✅ Created with ID: ${result.insertedId}\n`);
    }

    console.log('✨ Successfully seeded all copy traders!');
    console.log(`📈 Total traders created: ${sampleTraders.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding copy traders:', error);
    process.exit(1);
  }
}

// Run the seed function
seedCopyTraders();
