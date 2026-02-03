'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  kycStatus: string;
  kycDocuments?: {
    idFront: string;
    idBack: string;
    proofOfAddress: string;
    submittedAt: string;
  };
}

export default function AdminKYCReviewPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserKYC();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchUserKYC = async () => {
    try {
      console.log('Fetching user KYC for ID:', userId);
      const response = await fetch(`/api/admin/users/${userId}`);
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('User data received:', data);
        console.log('KYC Documents:', data.user?.kycDocuments);
        setUser(data.user);
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
      }
    } catch (error) {
      console.error('Failed to fetch user KYC:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!confirm('Approve this KYC submission?')) return;

    setProcessing(true);
    try {
      console.log('Approving KYC for user:', userId);
      const response = await fetch(`/api/admin/kyc/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });

      console.log('Approve response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Approve success:', data);
        alert('KYC approved successfully!');
        router.push('/admin/users');
      } else {
        const errorData = await response.json();
        console.error('Approve error:', errorData);
        alert(`Failed to approve KYC: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Approve exception:', error);
      alert('Failed to approve KYC: Network error');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setProcessing(true);
    try {
      console.log('Rejecting KYC for user:', userId);
      console.log('Rejection reason:', rejectionReason);
      
      const response = await fetch(`/api/admin/kyc/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', rejectionReason }),
      });

      console.log('Reject response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Reject success:', data);
        alert('KYC rejected successfully!');
        setShowRejectModal(false);
        router.push('/admin/users');
      } else {
        const errorData = await response.json();
        console.error('Reject error:', errorData);
        alert(`Failed to reject KYC: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Reject exception:', error);
      alert('Failed to reject KYC: Network error');
    } finally {
      setProcessing(false);
      setRejectionReason('');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user?.kycDocuments) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-white mb-4">No KYC Documents</h2>
        <p className="text-slate-400 mb-4">
          {user ? `User: ${user.firstName} ${user.lastName} (${user.email})` : 'User data not loaded'}
        </p>
        <p className="text-slate-500 text-sm mb-4">
          KYC Status: {user?.kycStatus || 'Unknown'}
        </p>
        <div className="bg-slate-800 rounded-lg p-4 max-w-md mx-auto mb-4">
          <p className="text-slate-400 text-xs">Debug Info:</p>
          <pre className="text-slate-300 text-xs mt-2 overflow-auto">
            {JSON.stringify({ hasUser: !!user, kycDocuments: user?.kycDocuments }, null, 2)}
          </pre>
        </div>
        <button
          onClick={() => router.push('/admin/users')}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/users')} className="p-2 hover:bg-white/10 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">KYC Review</h1>
            <p className="text-slate-400">{user.firstName} {user.lastName}</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">User Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Email</p>
            <p className="text-white font-semibold">{user.email}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Phone</p>
            <p className="text-white font-semibold">{user.phone}</p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">KYC Documents</h2>
        <p className="text-slate-400 text-sm mb-6">Click on any image to view full size</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ID Front */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm">ID Front</h3>
            <button
              onClick={() => setZoomedImage(user.kycDocuments!.idFront)}
              className="w-full aspect-[4/3] relative border-2 border-white/10 rounded-lg overflow-hidden hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/20 group"
            >
              <img 
                src={user.kycDocuments!.idFront} 
                alt="ID Front" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </button>
          </div>

          {/* ID Back */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm">ID Back</h3>
            <button
              onClick={() => setZoomedImage(user.kycDocuments!.idBack)}
              className="w-full aspect-[4/3] relative border-2 border-white/10 rounded-lg overflow-hidden hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/20 group"
            >
              <img 
                src={user.kycDocuments!.idBack} 
                alt="ID Back" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Proof of Address */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm">Proof of Address</h3>
            <button
              onClick={() => setZoomedImage(user.kycDocuments!.proofOfAddress)}
              className="w-full aspect-[4/3] relative border-2 border-white/10 rounded-lg overflow-hidden hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/20 group"
            >
              <img 
                src={user.kycDocuments!.proofOfAddress} 
                alt="Proof of Address" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      {user.kycStatus === 'pending' && (
        <div className="flex gap-4">
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={processing}
            className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
          >
            {processing ? 'Processing...' : 'Reject KYC'}
          </button>
          <button
            onClick={handleApprove}
            disabled={processing}
            className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
          >
            {processing ? 'Processing...' : 'Approve KYC'}
          </button>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Reject KYC</h3>
            <p className="text-slate-400 mb-4">Please provide a reason for rejection:</p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              rows={4}
              placeholder="E.g., Document is blurry, ID has expired, etc."
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={processing}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors z-10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Download button */}
            <a
              href={zoomedImage}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-20 p-2 bg-emerald-600/80 hover:bg-emerald-500 rounded-full transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Image */}
            <img
              src={zoomedImage}
              alt="Document Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
