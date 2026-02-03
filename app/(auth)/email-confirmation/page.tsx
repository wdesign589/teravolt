'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function EmailConfirmationPage() {
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setResent(true);
      setTimeout(() => setResent(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
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

        {/* Email Confirmation Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 relative">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-black">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">Check Your Email</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              We've sent a confirmation link to your email address. Please check your inbox and click the link to verify your account.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-black/20 border border-white/10 rounded-lg p-5 mb-6">
            <h3 className="text-white font-semibold text-sm mb-3">What's next?</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Check your email inbox</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Click the verification link</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Start exploring your account</span>
              </li>
            </ul>
          </div>

          {/* Resend Section */}
          <div className="text-center mb-6">
            <p className="text-sm text-slate-400 mb-3">
              Didn't receive the email?
            </p>
            <button
              onClick={handleResend}
              disabled={isResending || resent}
              className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Sending...' : resent ? 'Email Sent!' : 'Resend Confirmation Email'}
            </button>
            <p className="text-xs text-slate-500 mt-2">
              Check your spam folder if you can't find it
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
          </div>

          {/* Back to Sign In */}
          <div className="text-center">
            <Link 
              href="/sign-in" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to sign in
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6 text-slate-500 text-xs">
          <p>Need help?{' '}
            <Link href="/contact" className="text-emerald-400 hover:text-emerald-300">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
