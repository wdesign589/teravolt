import { Resend } from 'resend';
import { ReactElement } from 'react';
import { EMAIL_COMPANY_NAME } from './constants';

interface SendResendEmailOptions {
  to: string | string[];
  subject: string;
  react: ReactElement;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY is not configured. Replace re_xxxxxxxxx with your real API key in .env.local.'
    );
  }

  return new Resend(apiKey);
}

function getFromAddress() {
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const fromName = process.env.RESEND_FROM_NAME || EMAIL_COMPANY_NAME;

  return `${fromName} <${fromEmail}>`;
}

/**
 * Send an email via Resend using a React Email component.
 * Resend renders the React component to HTML automatically.
 */
export async function sendResendEmail({
  to,
  subject,
  react,
}: SendResendEmailOptions) {
  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: getFromAddress(),
    to,
    subject,
    react,
  });

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`);
  }

  console.log('Resend email sent successfully:', data?.id);
  return { success: true, id: data?.id };
}
