import { NextResponse } from 'next/server';
import { verifySmtpConnection } from '@/lib/email/smtp';

/**
 * Test endpoint to verify SMTP configuration
 * GET /api/test-smtp
 */
export async function GET() {
  try {
    const isConnected = await verifySmtpConnection();
    
    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'SMTP server connection successful! Email sending is configured correctly.',
        config: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          secure: process.env.SMTP_SECURE === 'true',
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to connect to SMTP server. Please check your configuration.',
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'SMTP connection test failed. Please verify your credentials.',
    }, { status: 500 });
  }
}
