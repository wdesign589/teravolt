'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PendingDeposit {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  amount: number;
  status: string;
  description: string;
  transactionHash?: string;
  proofUrl?: string;
  walletSymbol?: string;
  createdAt: string;
  balanceBefore: number;
}

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<PendingDeposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showProof, setShowProof] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  useEffect(() => {
    fetchDeposits();
  }, [statusFilter]);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/deposits?status=${statusFilter}`);
      if (response.ok) {
        const data = await response.json();
        setDeposits(data.deposits);
      }
    } catch (error) {
      console.error('Failed to fetch deposits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (depositId: string) => {
    if (!confirm('Are you sure you want to approve this deposit? This will add funds to the user\'s balance.')) {
      return;
    }

    setProcessingId(depositId);
    try {
      const response = await fetch('/api/admin/deposits/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ depositId }),
      });

      if (response.ok) {
        alert('Deposit approved successfully!');
        fetchDeposits();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to approve deposit');
      }
    } catch (error) {
      console.error('Error approving deposit:', error);
      alert('Failed to approve deposit');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (depositId: string) => {
    const reason = prompt('Please enter the reason for rejection:');
    
    if (!reason) {
      return;
    }

    setProcessingId(depositId);
    try {
      const response = await fetch('/api/admin/deposits/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ depositId, reason }),
      });

      if (response.ok) {
        alert('Deposit rejected successfully!');
        fetchDeposits();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to reject deposit');
      }
    } catch (error) {
      console.error('Error rejecting deposit:', error);
      alert('Failed to reject deposit');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Deposit Requests</h1>
          <p className="text-slate-400 mt-1">Review and approve user deposit submissions</p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {['pending', 'completed', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                statusFilter === status
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Deposits Table */}
      {loading ? (
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-12">
          <div className="text-center text-slate-400">Loading deposits...</div>
        </div>
      ) : (
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Wallet
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Transaction Hash
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Proof
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  {statusFilter === 'pending' && (
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {deposits.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                      No {statusFilter} deposits found
                    </td>
                  </tr>
                ) : (
                  deposits.map((deposit) => (
                    <tr key={deposit._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-white">
                            {deposit.userId.firstName} {deposit.userId.lastName}
                          </div>
                          <div className="text-xs text-slate-400">{deposit.userId.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-emerald-400">
                          ${deposit.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-slate-400">
                          Balance: ${deposit.balanceBefore.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-semibold">
                          {deposit.walletSymbol?.replace('_', ' ')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-300 font-mono max-w-xs truncate">
                          {deposit.transactionHash}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {deposit.proofUrl && (
                          <button
                            onClick={() => setShowProof(deposit.proofUrl!)}
                            className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-xs font-semibold transition-all"
                          >
                            View Proof
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(deposit.createdAt).toLocaleDateString()}
                        <div className="text-xs text-slate-400">
                          {new Date(deposit.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${
                          deposit.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                          deposit.status === 'pending' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                        </span>
                      </td>
                      {statusFilter === 'pending' && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(deposit._id)}
                              disabled={processingId === deposit._id}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {processingId === deposit._id ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleReject(deposit._id)}
                              disabled={processingId === deposit._id}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proof Modal */}
      {showProof && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Payment Proof</h3>
              <button
                onClick={() => setShowProof(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative w-full h-[600px] bg-slate-800 rounded-xl overflow-hidden">
              <Image
                src={showProof}
                alt="Payment Proof"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
