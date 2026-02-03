import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { getDatabase } from '@/lib/db/mongodb';
import { InvestmentPlan, createInvestmentPlanDocument } from '@/lib/models/Investment';

/**
 * Seed 4 default investment plans
 */
async function seedInvestments() {
  console.log('🌱 Seeding investment plans...\n');

  try {
    const db = await getDatabase();
    const collection = db.collection<InvestmentPlan>('investmentPlans');

    // Clear existing plans (optional - comment out to keep existing)
    // await collection.deleteMany({});
    // console.log('✅ Cleared existing investment plans\n');

    const plans = [
      {
        name: 'Starter Plan',
        description: 'Perfect for beginners looking to start their investment journey with minimal risk and steady returns.',
        minimumAmount: 100,
        maximumAmount: 999,
        durationDays: 30,
        percentageReturn: 15,
        isActive: true,
        features: [
          'Daily profit distribution',
          'Low risk investment',
          'Instant activation',
          '24/7 customer support',
          'Easy withdrawal process',
        ],
        risk: 'low' as const,
        category: 'Beginner',
      },
      {
        name: 'Growth Plan',
        description: 'Ideal for investors seeking balanced growth with moderate risk and attractive daily returns.',
        minimumAmount: 1000,
        maximumAmount: 4999,
        durationDays: 60,
        percentageReturn: 35,
        isActive: true,
        features: [
          'Higher daily returns',
          'Diversified portfolio',
          'Priority support',
          'Automated profit credits',
          'Investment tracking dashboard',
          'Flexible withdrawal options',
        ],
        risk: 'medium' as const,
        category: 'Intermediate',
      },
      {
        name: 'Premium Plan',
        description: 'Advanced investment strategy for experienced investors seeking maximum returns with calculated risks.',
        minimumAmount: 5000,
        maximumAmount: 19999,
        durationDays: 90,
        percentageReturn: 60,
        isActive: true,
        features: [
          'Maximum daily profit',
          'Dedicated account manager',
          'Advanced analytics',
          'Compound interest options',
          'VIP customer support',
          'Early withdrawal privileges',
          'Exclusive investment insights',
        ],
        risk: 'medium' as const,
        category: 'Advanced',
      },
      {
        name: 'Elite Plan',
        description: 'Exclusive high-tier investment plan for serious investors with substantial capital and long-term vision.',
        minimumAmount: 20000,
        maximumAmount: 100000,
        durationDays: 180,
        percentageReturn: 150,
        isActive: true,
        features: [
          'Highest return potential',
          'Personal investment advisor',
          'Custom investment strategies',
          'Real-time profit tracking',
          'Concierge support service',
          'Guaranteed profit distribution',
          'Priority withdrawal processing',
          'Exclusive market insights',
          'Portfolio diversification',
        ],
        risk: 'high' as const,
        category: 'Professional',
      },
    ];

    console.log('📦 Creating investment plans...\n');

    for (const planData of plans) {
      const plan = createInvestmentPlanDocument(planData);
      
      await collection.insertOne(plan);
      
      console.log(`✅ Created: ${plan.name}`);
      console.log(`   - Amount Range: $${plan.minimumAmount} - $${plan.maximumAmount}`);
      console.log(`   - Duration: ${plan.durationDays} days`);
      console.log(`   - Total Return: ${plan.percentageReturn}%`);
      console.log(`   - Daily Return: ${plan.dailyReturn.toFixed(2)}%`);
      console.log(`   - Risk: ${plan.risk}`);
      console.log('');
    }

    console.log('🎉 Successfully seeded 4 investment plans!\n');
    console.log('📊 Summary:');
    console.log('   - Starter Plan: 15% over 30 days (Low Risk)');
    console.log('   - Growth Plan: 35% over 60 days (Medium Risk)');
    console.log('   - Premium Plan: 60% over 90 days (Medium Risk)');
    console.log('   - Elite Plan: 150% over 180 days (High Risk)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding investments:', error);
    process.exit(1);
  }
}

seedInvestments();
