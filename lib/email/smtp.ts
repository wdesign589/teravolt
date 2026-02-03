import nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import { ReactElement } from 'react';

// Create reusable SMTP transporter
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP configuration is incomplete. Please check your environment variables.');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Additional options for better compatibility
    tls: {
      // Do not fail on invalid certs (useful for self-signed certificates)
      rejectUnauthorized: false,
    },
  });
};

interface SendEmailOptions {
  to: string;
  subject: string;
  react: ReactElement;
}

/**
 * Send email using SMTP server
 */
export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  try {
    const transporter = createTransporter();
    
    // Render React email component to HTML (await the Promise)
    const html = await render(react);
    
    // Send email
    const info = await transporter.sendMail({
      from: {
        name: process.env.SMTP_FROM_NAME || 'Terravolt',
        address: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || '',
      },
      to,
      subject,
      html,
    });
    
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Email sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Verify SMTP connection (useful for testing)
 */
export async function verifySmtpConnection() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('SMTP server is ready to send emails');
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
}
