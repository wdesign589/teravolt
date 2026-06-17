import { NextRequest } from 'next/server';

export function verifyCronRequest(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return {
      authorized: false,
      status: 500,
      error: 'CRON_SECRET is not configured',
    };
  }

  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${cronSecret}`) {
    return {
      authorized: false,
      status: 401,
      error: 'Unauthorized',
    };
  }

  return { authorized: true as const };
}
