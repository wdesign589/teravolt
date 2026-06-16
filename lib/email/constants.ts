export const EMAIL_SITE_URL = 'https://www.terravoltinc.com';
export const EMAIL_LOGIN_URL = `${EMAIL_SITE_URL}/sign-in`;
export const EMAIL_SUPPORT = 'support@terravoltinc.com';
export const EMAIL_COMPANY_NAME = 'Terravolt';
export const EMAIL_COMPANY_LEGAL = 'Teravolt Incorporated';

export const EMAIL_OFFICE_ADDRESS =
  '45 Liverpool Street, London EC2M 7AE, United Kingdom';

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || EMAIL_SITE_URL;
}

/** Public logo URL for sent emails (must be reachable by email clients). */
export function getEmailLogoUrl() {
  return `${EMAIL_SITE_URL}/icon.png`;
}

/** Logo URL for local preview (Next.js image optimizer). */
export function getPreviewLogoUrl() {
  const appUrl = getAppUrl().replace(/\/$/, '');
  return `${appUrl}/_next/image?url=%2Ficon.png&w=384&q=75`;
}

export function getLogoUrl() {
  const appUrl = getAppUrl();
  if (appUrl.includes('localhost')) {
    return getPreviewLogoUrl();
  }

  return getEmailLogoUrl();
}
