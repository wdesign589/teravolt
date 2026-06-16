import WelcomeEmail from '@/emails/WelcomeEmail';
import {
  EMAIL_COMPANY_NAME,
  EMAIL_LOGIN_URL,
  EMAIL_OFFICE_ADDRESS,
  EMAIL_SITE_URL,
  EMAIL_SUPPORT,
} from '@/lib/email/constants';
import { WELCOME_EMAIL_PREVIEW_NAME } from '@/lib/email/welcome';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Welcome Email Preview | Terravolt',
  robots: 'noindex, nofollow',
};

export default async function WelcomeEmailPreviewPage() {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const logoUrl = `${protocol}://${host}/_next/image?url=%2Ficon.png&w=384&q=75`;

  return (
    <div className="min-h-screen bg-slate-200 py-12 px-4">
      <div className="max-w-[680px] mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-slate-200">
        <WelcomeEmail
          firstName={WELCOME_EMAIL_PREVIEW_NAME}
          dashboardLink={EMAIL_LOGIN_URL}
          appUrl={EMAIL_SITE_URL}
          logoUrl={logoUrl}
          supportEmail={EMAIL_SUPPORT}
          companyName={EMAIL_COMPANY_NAME}
          officeAddress={EMAIL_OFFICE_ADDRESS}
        />
      </div>
    </div>
  );
}
