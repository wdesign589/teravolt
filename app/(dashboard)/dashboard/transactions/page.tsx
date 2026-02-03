'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import Image from 'next/image';

interface Transaction {
  _id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'investment_return' | 'investment_completion' | 'copy_trading_return';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'rejected';
  description: string;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: string;
  updatedAt: string;
  
  // Optional fields based on transaction type
  transactionHash?: string;
  proofUrl?: string;
  walletSymbol?: string;
  walletAddress?: string;
  bankDetails?: string;
  paypalEmail?: string;
  adminNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
  investmentId?: string;
  investmentPlanName?: string;
}

export default function TransactionsPage() {
  const user = useAuthStore((state) => state.user);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [typeFilter, statusFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let url = '/api/transactions?limit=100';
      
      if (typeFilter !== 'all') {
        url += `&type=${typeFilter}`;
      }
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return (
          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
          </svg>
        );
      case 'withdrawal':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" transform="rotate(180 10 10)" />
          </svg>
        );
      case 'investment':
      case 'investment_return':
      case 'investment_completion':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        );
      case 'copy_trading_return':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 7H7v6h6V7z" />
            <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-emerald-100 text-emerald-700`;
      case 'pending':
        return `${baseClasses} bg-amber-100 text-amber-700`;
      case 'failed':
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-700`;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'Deposit';
      case 'withdrawal':
        return 'Withdrawal';
      case 'investment':
        return 'Investment';
      case 'investment_return':
        return 'Investment Return';
      case 'investment_completion':
        return 'Investment Completion';
      case 'copy_trading_return':
        return 'Copy Trading Return';
      default:
        return type;
    }
  };

  const openDetailModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
  };

  const parseBankDetails = (bankDetailsStr?: string) => {
    if (!bankDetailsStr) return null;
    try {
      return JSON.parse(bankDetailsStr);
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Transaction History</h1>
        <p className="text-slate-600 mt-1">View all your account transactions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none text-slate-900"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="investment">Investments</option>
              <option value="investment_return">Investment Returns</option>
              <option value="investment_completion">Investment Completions</option>
              <option value="copy_trading_return">Copy Trading Returns</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none text-slate-900"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-semibold text-slate-900 mb-2">No transactions found</p>
            <p className="text-sm text-slate-500">Try adjusting your filters or make your first transaction</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => openDetailModal(transaction)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <span className="text-sm font-semibold text-slate-900">
                          {getTypeLabel(transaction.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 max-w-md truncate">
                        {transaction.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-bold ${
                        transaction.type === 'withdrawal' || transaction.type === 'investment'
                          ? 'text-red-600'
                          : 'text-emerald-600'
                      }`}>
                        {transaction.type === 'withdrawal' || transaction.type === 'investment' ? '-' : '+'}
                        ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={getStatusBadge(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailModal(transaction);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {getTransactionIcon(selectedTransaction.type)}
                <h2 className="text-2xl font-bold text-slate-900">
                  Transaction Details
                </h2>
              </div>
              <button
                onClick={closeDetailModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Transaction Info */}
            <div className="space-y-4">
              {/* Type & Status */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Transaction Type</div>
                  <div className="text-lg font-semibold text-slate-900">
                    {getTypeLabel(selectedTransaction.type)}
                  </div>
                </div>
                <span className={getStatusBadge(selectedTransaction.status)}>
                  {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                </span>
              </div>

              {/* Amount */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-sm text-slate-500 mb-2">Amount</div>
                <div className={`text-3xl font-bold ${
                  selectedTransaction.type === 'withdrawal' || selectedTransaction.type === 'investment'
                    ? 'text-red-600'
                    : 'text-emerald-600'
                }`}>
                  {selectedTransaction.type === 'withdrawal' || selectedTransaction.type === 'investment' ? '-' : '+'}
                  ${selectedTransaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="text-sm text-slate-500 mb-1">Description</div>
                <div className="text-slate-900">{selectedTransaction.description}</div>
              </div>

              {/* Balance Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Balance Before</div>
                  <div className="text-lg font-semibold text-slate-900">
                    ${selectedTransaction.balanceBefore.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Balance After</div>
                  <div className="text-lg font-semibold text-slate-900">
                    ${selectedTransaction.balanceAfter.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Deposit/Withdrawal Specific Details */}
              {(selectedTransaction.type === 'deposit' || selectedTransaction.type === 'withdrawal') && (
                <>
                  {selectedTransaction.walletSymbol && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Cryptocurrency</div>
                      <div className="text-slate-900 font-medium">
                        {selectedTransaction.walletSymbol.replace('_', ' ')}
                      </div>
                    </div>
                  )}

                  {selectedTransaction.walletAddress && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Wallet Address</div>
                      <div className="text-slate-900 font-mono text-sm break-all bg-slate-50 p-3 rounded-lg">
                        {selectedTransaction.walletAddress}
                      </div>
                    </div>
                  )}

                  {selectedTransaction.transactionHash && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Transaction Hash</div>
                      <div className="text-slate-900 font-mono text-sm break-all bg-slate-50 p-3 rounded-lg">
                        {selectedTransaction.transactionHash}
                      </div>
                    </div>
                  )}

                  {selectedTransaction.proofUrl && (
                    <div>
                      <div className="text-sm text-slate-500 mb-2">Proof of Payment</div>
                      <div className="relative w-full h-64 bg-slate-50 rounded-xl overflow-hidden">
                        <Image
                          src={selectedTransaction.proofUrl}
                          alt="Payment Proof"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {selectedTransaction.bankDetails && (() => {
                    const bankData = parseBankDetails(selectedTransaction.bankDetails);
                    return bankData ? (
                      <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                        <div className="text-sm font-semibold text-slate-900 mb-3">Bank Details</div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-slate-500">Bank Name:</span>
                            <div className="font-medium text-slate-900">{bankData.bankName}</div>
                          </div>
                          <div>
                            <span className="text-slate-500">Account Number:</span>
                            <div className="font-medium text-slate-900">{bankData.accountNumber}</div>
                          </div>
                          {bankData.routingNumber && (
                            <div>
                              <span className="text-slate-500">Routing Number:</span>
                              <div className="font-medium text-slate-900">{bankData.routingNumber}</div>
                            </div>
                          )}
                          {bankData.accountHolderName && (
                            <div>
                              <span className="text-slate-500">Account Holder:</span>
                              <div className="font-medium text-slate-900">{bankData.accountHolderName}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null;
                  })()}

                  {selectedTransaction.paypalEmail && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">PayPal Email</div>
                      <div className="text-slate-900 font-medium">{selectedTransaction.paypalEmail}</div>
                    </div>
                  )}
                </>
              )}

              {/* Investment Details */}
              {selectedTransaction.investmentPlanName && (
                <div>
                  <div className="text-sm text-slate-500 mb-1">Investment Plan</div>
                  <div className="text-slate-900 font-medium">{selectedTransaction.investmentPlanName}</div>
                </div>
              )}

              {/* Admin Notes (if rejected) */}
              {selectedTransaction.adminNotes && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="text-sm font-semibold text-red-900 mb-2">Admin Notes</div>
                  <div className="text-sm text-red-800">{selectedTransaction.adminNotes}</div>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Created At</div>
                  <div className="text-sm text-slate-900">
                    {new Date(selectedTransaction.createdAt).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Last Updated</div>
                  <div className="text-sm text-slate-900">
                    {new Date(selectedTransaction.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Transaction ID</div>
                <div className="text-xs text-slate-900 font-mono break-all">{selectedTransaction._id}</div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDetailModal}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
