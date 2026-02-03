'use client';

import { useState, useEffect } from 'react';

interface PendingWithdrawal {
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
  walletAddress?: string;
  walletSymbol?: string;
  bankDetails?: string;
  paypalEmail?: string;
  createdAt: string;
  balanceBefore: number;
  balanceAfter: number;
}

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<PendingWithdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  useEffect(() => {
    fetchWithdrawals();
  }, [statusFilter]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/withdrawals?status=${statusFilter}`);
      if (response.ok) {
        const data = await response.json();
        setWithdrawals(data.withdrawals);
      }
    } catch (error) {
      console.error('Failed to fetch withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (withdrawalId: string) => {
    if (!confirm('Are you sure you want to approve this withdrawal? Confirm that you have sent the funds.')) {
      return;
    }

    setProcessingId(withdrawalId);
    try {
      const response = await fetch('/api/admin/withdrawals/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ withdrawalId }),
      });

      if (response.ok) {
        alert('Withdrawal approved successfully!');
        fetchWithdrawals();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to approve withdrawal');
      }
    } catch (error) {
      console.error('Error approving withdrawal:', error);
      alert('Failed to approve withdrawal');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (withdrawalId: string) => {
    const reason = prompt('Please enter the reason for rejection:');
    
    if (!reason) {
      return;
    }

    setProcessingId(withdrawalId);
    try {
      const response = await fetch('/api/admin/withdrawals/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ withdrawalId, reason }),
      });

      if (response.ok) {
        alert('Withdrawal rejected successfully! Funds have been returned to user.');
        fetchWithdrawals();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to reject withdrawal');
      }
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
      alert('Failed to reject withdrawal');
    } finally {
      setProcessingId(null);
    }
  };

  const parseWithdrawalDetails = (withdrawal: PendingWithdrawal) => {
    if (withdrawal.walletSymbol && withdrawal.walletAddress) {
      return {
        method: 'Crypto',
        details: `${withdrawal.walletSymbol.replace('_', ' ')}`,
        address: withdrawal.walletAddress,
      };
    } else if (withdrawal.bankDetails) {
      try {
        const bankData = JSON.parse(withdrawal.bankDetails);
        return {
          method: 'Bank Transfer',
          details: bankData.bankName || 'Bank',
          address: `Acc: ${bankData.accountNumber || 'N/A'}`,
        };
      } catch {
        return {
          method: 'Bank Transfer',
          details: 'Bank',
          address: 'N/A',
        };
      }
    } else if (withdrawal.paypalEmail) {
      return {
        method: 'PayPal',
        details: 'PayPal',
        address: withdrawal.paypalEmail,
      };
    }
    return {
      method: 'Unknown',
      details: 'Unknown',
      address: 'N/A',
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Withdrawal Requests</h1>
          <p className="text-slate-400 mt-1">Review and process user withdrawal requests</p>
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

      {/* Withdrawals Table */}
      {loading ? (
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-12">
          <div className="text-center text-slate-400">Loading withdrawals...</div>
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
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Details
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
                {withdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      No {statusFilter} withdrawals found
                    </td>
                  </tr>
                ) : (
                  withdrawals.map((withdrawal) => {
                    const details = parseWithdrawalDetails(withdrawal);
                    return (
                      <tr key={withdrawal._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-white">
                              {withdrawal.userId.firstName} {withdrawal.userId.lastName}
                            </div>
                            <div className="text-xs text-slate-400">{withdrawal.userId.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-red-400">
                            -${withdrawal.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-xs text-slate-400">
                            New: ${withdrawal.balanceAfter.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-semibold">
                            {details.method}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-300">{details.details}</div>
                          <div className="text-xs text-slate-400 font-mono max-w-xs truncate">
                            {details.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">
                          {new Date(withdrawal.createdAt).toLocaleDateString()}
                          <div className="text-xs text-slate-400">
                            {new Date(withdrawal.createdAt).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${
                            withdrawal.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                            withdrawal.status === 'pending' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                          </span>
                        </td>
                        {statusFilter === 'pending' && (
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleApprove(withdrawal._id)}
                                disabled={processingId === withdrawal._id}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {processingId === withdrawal._id ? 'Processing...' : 'Approve'}
                              </button>
                              <button
                                onClick={() => handleReject(withdrawal._id)}
                                disabled={processingId === withdrawal._id}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
