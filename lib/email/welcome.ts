import WelcomeEmail from '@/emails/WelcomeEmail';
import {
  EMAIL_COMPANY_NAME,
  EMAIL_LOGIN_URL,
  EMAIL_OFFICE_ADDRESS,
  EMAIL_SITE_URL,
  EMAIL_SUPPORT,
  getEmailLogoUrl,
  getPreviewLogoUrl,
} from './constants';

export const WELCOME_EMAIL_SUBJECT =
  "Welcome to Terravolt, we're glad you're here";

export const WELCOME_EMAIL_PREVIEW_NAME = '[First Name]';

export function getWelcomeEmailProps(firstName: string, forPreview = false) {
  return {
    firstName,
    dashboardLink: EMAIL_LOGIN_URL,
    appUrl: EMAIL_SITE_URL,
    logoUrl: forPreview ? getPreviewLogoUrl() : getEmailLogoUrl(),
    supportEmail: EMAIL_SUPPORT,
    companyName: EMAIL_COMPANY_NAME,
    officeAddress: EMAIL_OFFICE_ADDRESS,
  };
}

export function createWelcomeEmail(firstName: string) {
  return WelcomeEmail(getWelcomeEmailProps(firstName));
}
