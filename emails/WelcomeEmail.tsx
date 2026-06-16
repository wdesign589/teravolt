import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

export interface WelcomeEmailProps {
  firstName: string;
  dashboardLink: string;
  logoUrl: string;
  appUrl?: string;
  supportEmail?: string;
  companyName?: string;
  officeAddress?: string;
}

export const WelcomeEmail = ({
  firstName = '[First Name]',
  dashboardLink = 'https://www.terravoltinc.com/sign-in',
  logoUrl = 'https://www.terravoltinc.com/icon.png',
  appUrl = 'https://www.terravoltinc.com',
  supportEmail = 'support@terravoltinc.com',
  companyName = 'Terravolt',
  officeAddress = '45 Liverpool Street, London EC2M 7AE, United Kingdom',
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to {companyName}. Your account is ready.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src={logoUrl} alt={companyName} width="48" height="48" style={logo} />
        </Section>

        <Heading style={title}>Welcome to {companyName}</Heading>

        <Text style={paragraph}>Dear {firstName},</Text>

        <Text style={paragraph}>
          Welcome to {companyName}. We&apos;re excited to have you on board!
        </Text>

        <Text style={paragraph}>
          With us, you&apos;ll have access to personalized investment opportunities
          across agriculture, renewable energy, and commodities, expert insights from
          industry leaders, and a secure, transparent platform to grow your wealth.
          Get started by logging in to your dashboard:
        </Text>

        <Section style={buttonSection}>
          <Button style={button} href={dashboardLink}>
            Go to your dashboard
          </Button>
        </Section>

        <Text style={paragraph}>
          For any assistance, feel free to reach out at{' '}
          <Link href={`mailto:${supportEmail}`} style={inlineLink}>
            {supportEmail}
          </Link>
          . We&apos;re here to help!
        </Text>

        <Text style={paragraph}>Thank you for choosing {companyName}.</Text>

        <Text style={signOff}>
          Best,
          <br />
          <strong>The {companyName} Team</strong>
        </Text>

        <Hr style={divider} />

        <Section style={footer}>
          <Text style={footerLinks}>
            <Link href={`${appUrl}/account`} style={footerLink}>
              Unsubscribe
            </Link>
            {' · '}
            <Link href={`${appUrl}/account`} style={footerLink}>
              Manage Preferences
            </Link>
          </Text>
          <Text style={footerAddress}>{officeAddress}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
  padding: '40px 32px 48px',
};

const header = {
  marginBottom: '32px',
};

const logo = {
  display: 'block',
  objectFit: 'contain' as const,
};

const title = {
  color: '#1e293b',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '0 0 32px',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px',
};

const buttonSection = {
  margin: '32px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#1a4031',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 32px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

const inlineLink = {
  color: '#3498db',
  textDecoration: 'underline',
};

const signOff = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 32px',
};

const divider = {
  borderColor: '#e2e8f0',
  margin: '32px 0 24px',
};

const footer = {
  textAlign: 'center' as const,
};

const footerLinks = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 12px',
};

const footerLink = {
  color: '#3498db',
  textDecoration: 'underline',
};

const footerAddress = {
  color: '#3498db',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0',
};
