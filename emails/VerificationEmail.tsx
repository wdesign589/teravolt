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

interface VerificationEmailProps {
  firstName: string;
  verificationLink: string;
}

export const VerificationEmail = ({
  firstName = 'there',
  verificationLink = 'https://terravolt.com/verify-email?token=example',
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your Terravolt account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Heading style={logo}>TERRAVOLT</Heading>
        </Section>
        
        <Heading style={h1}>Welcome to Terravolt! 🎉</Heading>
        
        <Text style={text}>
          Hi {firstName},
        </Text>
        
        <Text style={text}>
          Thank you for signing up with Teravolt Incorporated. We're excited to have you join our community of thousands of successful investors!
        </Text>
        
        <Text style={text}>
          To get started, please verify your email address by clicking the button below:
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={verificationLink}>
            Verify Email Address
          </Button>
        </Section>
        
        <Text style={text}>
          Or copy and paste this link into your browser:
        </Text>
        
        <Link href={verificationLink} style={link}>
          {verificationLink}
        </Link>
        
        <Hr style={hr} />
        
        <Text style={footer}>
          This verification link will expire in 24 hours. If you didn't create an account with Terravolt, you can safely ignore this email.
        </Text>
        
        <Text style={footer}>
          Need help? Contact our support team at{' '}
          <Link href="mailto:support@lunex.com" style={link}>
            support@lunex.com
          </Link>
        </Text>
        
        <Hr style={hr} />
        
        <Text style={footer}>
          © 2024 Teravolt Incorporated. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logoSection = {
  padding: '32px 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  color: '#10b981',
  fontSize: '32px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  letterSpacing: '-1px',
};

const h1 = {
  color: '#1e293b',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#64748b',
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'left' as const,
  padding: '0 32px',
};

const buttonContainer = {
  padding: '27px 0 27px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 32px',
  margin: '0 auto',
};

const link = {
  color: '#10b981',
  fontSize: '14px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
  padding: '0 32px',
  display: 'block',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0',
};

const footer = {
  color: '#94a3b8',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  padding: '0 32px',
};
