import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

import { distributeInvestmentProfits } from '@/lib/cron/distribute-investment-profits';

async function main() {
  console.log('Starting investment profit distribution...\n');
  const summary = await distributeInvestmentProfits();
  console.log('\nDistribution summary:', summary);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error during profit distribution:', error);
    process.exit(1);
  });
