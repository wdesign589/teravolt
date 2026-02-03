'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserRefetch } from '@/hooks/useUserRefetch';

export default function KYCPage() {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const refreshUser = useUserRefetch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Fetch fresh user data on page mount to ensure KYC status is current
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  // Document upload states
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  
  // Preview URLs
  const [idFrontPreview, setIdFrontPreview] = useState('');
  const [idBackPreview, setIdBackPreview] = useState('');
  const [proofOfAddressPreview, setProofOfAddressPreview] = useState('');
  
  // Handle file selection and preview
  const handleFileChange = (
    file: File | null, 
    setFile: (file: File | null) => void, 
    setPreview: (url: string) => void
  ) => {
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!idFront || !idBack || !proofOfAddress) {
      setError('Please upload all required documents');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('idFront', idFront);
      formData.append('idBack', idBack);
      formData.append('proofOfAddress', proofOfAddress);
      
      const response = await fetch('/api/kyc/submit', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit KYC');
      }
      
      setSuccess('KYC documents submitted successfully! We\'ll review them within 24-48 hours.');
      
      // Refresh user data to update KYC status
      await refreshUser();
      
      // Clear form
      setIdFront(null);
      setIdBack(null);
      setProofOfAddress(null);
      setIdFrontPreview('');
      setIdBackPreview('');
      setProofOfAddressPreview('');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting KYC');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get KYC status badge
  const getStatusBadge = () => {
    if (!user) return null;
    
    switch (user.kycStatus) {
      case 'approved':
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 text-amber-700 rounded-lg">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-semibold">Pending Review</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Rejected</span>
          </div>
        );
      case 'not_submitted':
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-300 text-slate-700 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-semibold">Not Submitted</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">KYC Verification</h1>
          <p className="text-slate-600 mt-1">Verify your identity to unlock all features</p>
        </div>
        {getStatusBadge()}
      </div>
      
      {/* Status Message - Approved */}
      {user?.kycStatus === 'approved' && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-emerald-900 mb-1">Identity Verified!</h3>
              <p className="text-emerald-700 text-sm">
                Your identity has been successfully verified. You now have full access to all platform features including deposits, withdrawals, and investments.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Status Message - Pending */}
      {user?.kycStatus === 'pending' && (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-900 mb-1">Verification In Progress</h3>
              <p className="text-amber-700 text-sm">
                Your KYC documents are currently being reviewed by our team. This typically takes 24-48 hours. We'll notify you once the review is complete.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Status Message - Rejected */}
      {user?.kycStatus === 'rejected' && (
        <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-1">Verification Unsuccessful</h3>
              <p className="text-red-700 text-sm mb-3">
                Unfortunately, we couldn't verify your identity with the documents provided. Please review the requirements below and resubmit clear, valid documents.
              </p>
              <button 
                onClick={() => {
                  setError('');
                  setSuccess('');
                }}
                className="text-sm font-semibold text-red-600 hover:text-red-700 underline"
              >
                Resubmit Documents
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Only show upload form if not approved and not pending */}
      {(user?.kycStatus === 'not_submitted' || user?.kycStatus === 'rejected') && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-2">Document Requirements:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Documents must be clear and all text must be readable</li>
                  <li>All four corners of the document must be visible</li>
                  <li>Supported formats: JPG, PNG, PDF (max 5MB per file)</li>
                  <li>Documents must be valid and not expired</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Success/Error Messages */}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-emerald-800 text-sm font-medium">{success}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}
          
          {/* Upload Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ID Front */}
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 hover:border-emerald-500 transition-colors">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">ID Card (Front)</h3>
                  <p className="text-xs text-slate-500">Government-issued ID or Passport</p>
                </div>
                
                {idFrontPreview ? (
                  <div className="relative">
                    <img src={idFrontPreview} alt="ID Front" className="w-full h-40 object-cover rounded-lg mb-3" />
                    <button
                      type="button"
                      onClick={() => {
                        setIdFront(null);
                        setIdFrontPreview('');
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null, setIdFront, setIdFrontPreview)}
                      className="hidden"
                    />
                    <div className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all font-medium text-sm">
                      Upload File
                    </div>
                  </label>
                )}
              </div>
            </div>
            
            {/* ID Back */}
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 hover:border-emerald-500 transition-colors">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">ID Card (Back)</h3>
                  <p className="text-xs text-slate-500">Back side of your ID</p>
                </div>
                
                {idBackPreview ? (
                  <div className="relative">
                    <img src={idBackPreview} alt="ID Back" className="w-full h-40 object-cover rounded-lg mb-3" />
                    <button
                      type="button"
                      onClick={() => {
                        setIdBack(null);
                        setIdBackPreview('');
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null, setIdBack, setIdBackPreview)}
                      className="hidden"
                    />
                    <div className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all font-medium text-sm">
                      Upload File
                    </div>
                  </label>
                )}
              </div>
            </div>
            
            {/* Proof of Address */}
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 hover:border-emerald-500 transition-colors md:col-span-2">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">Proof of Address</h3>
                  <p className="text-xs text-slate-500">Utility bill, bank statement, or rental agreement (not older than 3 months)</p>
                </div>
                
                {proofOfAddressPreview ? (
                  <div className="relative inline-block">
                    <img src={proofOfAddressPreview} alt="Proof of Address" className="w-64 h-40 object-cover rounded-lg mb-3" />
                    <button
                      type="button"
                      onClick={() => {
                        setProofOfAddress(null);
                        setProofOfAddressPreview('');
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null, setProofOfAddress, setProofOfAddressPreview)}
                      className="hidden"
                    />
                    <div className="inline-block px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all font-medium text-sm">
                      Upload File
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !idFront || !idBack || !proofOfAddress}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg shadow-emerald-500/30"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit for Verification'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
