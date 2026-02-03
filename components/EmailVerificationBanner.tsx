'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

export default function EmailVerificationBanner() {
  const { user } = useAuthStore();
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isVisible, setIsVisible] = useState(true);

  // Don't show banner if email is verified or user is not logged in
  if (!user || user.emailVerified || !isVisible) {
    return null;
  }

  const handleResendEmail = async () => {
    setIsResending(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessageType('success');
        setMessage(data.message || 'Verification email sent!');
      } else {
        setMessageType('error');
        setMessage(data.error || 'Failed to send email');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/40 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        {/* Warning Icon */}
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div className="flex-1">
          <h3 className="text-amber-900 font-bold text-sm mb-1">
            Email Verification Required
          </h3>
          <p className="text-amber-800 text-xs mb-3 font-medium">
            Please verify your email address to unlock all features. Check your inbox for the verification link.
          </p>
          
          {/* Success/Error Message */}
          {message && (
            <div className={`mb-3 p-2 rounded-md text-xs font-medium ${
              messageType === 'success' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-red-500/30 text-red-100 border border-red-500/40'
            }`}>
              {message}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-md transition-all"
            >
              {isResending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Resend Email'}
            </button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-amber-700 hover:text-amber-900 text-xs font-semibold transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-amber-700 hover:text-amber-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
