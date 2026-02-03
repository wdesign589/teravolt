'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendType, setResendType] = useState<'success' | 'error'>('success');

  const handleResend = async () => {
    if (!searchParams.get('email')) {
      setResendType('error');
      setResendMessage('Email address not found. Please sign up again.');
      return;
    }

    setIsResending(true);
    setResendMessage('');

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: searchParams.get('email') }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendType('success');
        setResendMessage('✓ Verification email sent! Check your inbox.');
      } else {
        setResendType('error');
        setResendMessage(data.error || 'Failed to send email. Please try again.');
      }
    } catch (error) {
      setResendType('error');
      setResendMessage('An error occurred. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <div className="w-full max-w-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="relative w-48 h-16 block">
            <Image
              src="/logo.png"
              alt="Terravolt"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
          {/* Email Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">Check Your Email</h1>
          
          <p className="text-slate-300 text-base mb-2">
            We've sent a verification link to:
          </p>
          
          <p className="text-emerald-400 font-semibold text-lg mb-6">
            {email}
          </p>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6 text-left">
            <p className="text-slate-300 text-sm mb-3">
              📧 <strong className="text-white">Next Steps:</strong>
            </p>
            <ol className="text-slate-400 text-sm space-y-2 list-decimal list-inside">
              <li>Open your email inbox</li>
              <li>Look for our verification email from <span className="text-emerald-400 font-medium">support@lunexcorpunion.com</span></li>
              <li>Click the "Verify Email Address" button</li>
              <li>You'll be redirected back to complete your setup</li>
            </ol>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-6">
            <p className="text-amber-300 text-xs">
              ⚠️ <strong>Important:</strong> The verification link expires in 24 hours
            </p>
          </div>

          {/* Resend Feedback Message */}
          {resendMessage && (
            <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              resendType === 'success' 
                ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' 
                : 'bg-red-500/30 text-red-100 border border-red-500/40'
            }`}>
              {resendMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 text-center"
            >
              Go to Dashboard
            </Link>
            
            <p className="text-slate-500 text-xs">
              Didn't receive the email?{' '}
              <button 
                onClick={handleResend}
                disabled={isResending}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Sending...' : 'Resend verification email'}
              </button>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-xs">
            Need help?{' '}
            <Link href="/support" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        <div className="w-full max-w-lg p-8">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500"></div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Loading...</h1>
          </div>
        </div>
      </div>
    }>
      <CheckEmailContent />
    </Suspense>
  );
}
