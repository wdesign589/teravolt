import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

import { distributeCopyTradingProfits } from '@/lib/cron/distribute-copy-trading-profits';

async function main() {
  console.log('Starting copy trading profit distribution...\n');
  const summary = await distributeCopyTradingProfits();
  console.log('\nDistribution summary:', summary);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error in copy trading profit distribution:', error);
    process.exit(1);
  });
