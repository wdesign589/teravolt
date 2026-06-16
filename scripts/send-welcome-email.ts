import { sendResendEmail } from '@/lib/email/resend';
import {
  WELCOME_EMAIL_SUBJECT,
  createWelcomeEmail,
} from '@/lib/email/welcome';

async function sendWelcomeEmail() {
  const to = process.argv[2] || 'tarri9192@gmail.com';
  const firstName = process.argv[3] || 'there';

  console.log(`Sending welcome email to ${to}...`);
  console.log(`From: ${process.env.RESEND_FROM_EMAIL}`);
  console.log(`Subject: ${WELCOME_EMAIL_SUBJECT}`);

  const result = await sendResendEmail({
    to,
    subject: WELCOME_EMAIL_SUBJECT,
    react: createWelcomeEmail(firstName),
  });

  console.log('Done.', result);
}

sendWelcomeEmail().catch((error) => {
  console.error('Failed to send welcome email:', error);
  process.exit(1);
});
