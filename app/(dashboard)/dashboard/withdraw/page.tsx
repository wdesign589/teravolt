'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  createdAt: string;
}

export default function WithdrawPage() {
  const user = useAuthStore((state) => state.user);
  const refetchUser = useAuthStore((state) => state.refetchUser);
  const [selectedMethod, setSelectedMethod] = useState('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    accountHolderName: '',
  });
  const [paypalEmail, setPaypalEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentWithdrawals, setRecentWithdrawals] = useState<Transaction[]>([]);
  const [loadingWithdrawals, setLoadingWithdrawals] = useState(true);

  useEffect(() => {
    fetchRecentWithdrawals();
  }, []);

  const fetchRecentWithdrawals = async () => {
    try {
      const response = await fetch('/api/transactions?type=withdrawal&limit=3');
      if (response.ok) {
        const data = await response.json();
        setRecentWithdrawals(data.transactions || []);
      }
    } catch (error) {
      console.error('Failed to fetch withdrawals:', error);
    } finally {
      setLoadingWithdrawals(false);
    }
  };

  const validateWithdrawal = () => {
    const withdrawAmount = parseFloat(amount);
    const userBalance = user?.balance || 0;

    if (!amount || withdrawAmount <= 0) {
      alert('Please enter a valid amount');
      return false;
    }

    if (withdrawAmount > userBalance) {
      alert(`Insufficient balance! Your available balance is $${userBalance.toFixed(2)}`);
      return false;
    }

    if (selectedMethod === 'crypto') {
      if (!address || address.trim() === '') {
        alert('Please enter your wallet address');
        return false;
      }
      if (!selectedCrypto) {
        alert('Please select a cryptocurrency');
        return false;
      }
    } else if (selectedMethod === 'bank') {
      if (!bankDetails.accountNumber || !bankDetails.routingNumber || !bankDetails.bankName || !bankDetails.accountHolderName) {
        alert('Please fill in all bank details');
        return false;
      }
    } else if (selectedMethod === 'paypal') {
      if (!paypalEmail || !paypalEmail.includes('@')) {
        alert('Please enter a valid PayPal email');
        return false;
      }
    }

    return true;
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateWithdrawal()) return;

    if (!confirm(`Are you sure you want to withdraw $${amount}? This amount will be deducted from your balance immediately.`)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const withdrawalData: any = {
        amount: parseFloat(amount),
        method: selectedMethod,
      };

      if (selectedMethod === 'crypto') {
        withdrawalData.walletAddress = address;
        withdrawalData.cryptocurrency = selectedCrypto;
      } else if (selectedMethod === 'bank') {
        withdrawalData.bankDetails = bankDetails;
      } else if (selectedMethod === 'paypal') {
        withdrawalData.paypalEmail = paypalEmail;
      }

      const response = await fetch('/api/withdrawal/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withdrawalData),
      });

      if (response.ok) {
        alert('Withdrawal request submitted successfully! Your balance has been deducted. Admin will review your request.');
        // Reset form
        setAmount('');
        setAddress('');
        setBankDetails({ accountNumber: '', routingNumber: '', bankName: '', accountHolderName: '' });
        setPaypalEmail('');
        // Refresh user data and withdrawals
        await refetchUser();
        fetchRecentWithdrawals();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit withdrawal request');
      }
    } catch (error) {
      console.error('Error submitting withdrawal:', error);
      alert('Failed to submit withdrawal request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const userBalance = user?.balance || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Withdraw Funds</h1>
        <p className="text-slate-600 mt-1">Transfer your funds securely to your preferred method</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Withdrawal Form - Left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Withdrawal Method */}
          <form onSubmit={handleWithdraw}>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Select Withdrawal Method</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  id: 'crypto', 
                  name: 'Cryptocurrency', 
                  fee: '0.0005 BTC',
                  icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                },
                { 
                  id: 'bank', 
                  name: 'Bank Transfer', 
                  fee: '$10',
                  icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                },
                { 
                  id: 'paypal', 
                  name: 'PayPal', 
                  fee: '2.5%',
                  icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`mb-3 ${
                    selectedMethod === method.id
                      ? 'text-emerald-600'
                      : 'text-slate-400'
                  }`}>{method.icon}</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">{method.name}</div>
                  <div className="text-xs text-slate-500">Fee: {method.fee}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Withdrawal Details</h3>
            
            <div className="space-y-6">
              {/* Amount */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block">Amount to Withdraw</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    max={userBalance}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-4 border-2 border-slate-200 rounded-2xl text-lg font-semibold focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-slate-500">Available: ${userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <button
                    type="button"
                    onClick={() => setAmount(userBalance.toString())}
                    className="text-xs text-emerald-600 font-semibold hover:text-emerald-700"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Crypto Type Selection */}
              {selectedMethod === 'crypto' && (
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">Select Cryptocurrency</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'BTC', name: 'Bitcoin' },
                      { id: 'ETH', name: 'Ethereum' },
                      { id: 'USDT_TRC20', name: 'USDT (TRC20)' },
                      { id: 'USDT_ERC20', name: 'USDT (ERC20)' },
                    ].map((crypto) => (
                      <button
                        key={crypto.id}
                        type="button"
                        onClick={() => setSelectedCrypto(crypto.id)}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                          selectedCrypto === crypto.id
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        {crypto.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Crypto Address */}
              {selectedMethod === 'crypto' && (
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">Your {selectedCrypto.replace('_', ' ')} Wallet Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your crypto wallet address"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-mono text-sm text-slate-900"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-slate-600">Double check the address. Transfers cannot be reversed.</span>
                  </div>
                </div>
              )}

              {/* Bank Details */}
              {selectedMethod === 'bank' && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-3 block">Account Holder Name *</label>
                    <input
                      type="text"
                      required
                      value={bankDetails.accountHolderName}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
                      placeholder="Enter account holder name"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-3 block">Account Number *</label>
                    <input
                      type="text"
                      required
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                      placeholder="Enter account number"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-3 block">Routing Number *</label>
                    <input
                      type="text"
                      required
                      value={bankDetails.routingNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                      placeholder="Enter routing number"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-3 block">Bank Name *</label>
                    <input
                      type="text"
                      required
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                      placeholder="Enter bank name"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                    />
                  </div>
                </>
              )}

              {/* PayPal */}
              {selectedMethod === 'paypal' && (
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">PayPal Email *</label>
                  <input
                    type="email"
                    required
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>
              )}

              {/* Withdrawal Summary */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-4">Withdrawal Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Withdrawal Amount</span>
                    <span className="font-semibold text-slate-900">${amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Processing Fee</span>
                    <span className="font-semibold text-slate-900">
                      {selectedMethod === 'crypto' ? '$2.50' : selectedMethod === 'bank' ? '$10.00' : `$${((parseFloat(amount) || 0) * 0.025).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-slate-300 pt-3 flex justify-between">
                    <span className="font-bold text-slate-900">You'll Receive</span>
                    <span className="text-lg font-bold text-emerald-600">
                      ${selectedMethod === 'crypto' 
                        ? ((parseFloat(amount) || 0) - 2.5).toFixed(2)
                        : selectedMethod === 'bank'
                        ? ((parseFloat(amount) || 0) - 10).toFixed(2)
                        : ((parseFloat(amount) || 0) * 0.975).toFixed(2)
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > userBalance}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Withdraw Funds'
                )}
              </button>
            </div>
          </div>
          </form>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Available Balance */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700">Available Balance</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              ${userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-slate-500">Ready to withdraw</div>
          </div>

          {/* Withdrawal Limits */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Withdrawal Limits</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Daily Limit</span>
                  <span className="font-semibold text-slate-900">$50,000</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
                <div className="text-xs text-slate-500 mt-1">$9,000 used today</div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Monthly Limit</span>
                  <span className="font-semibold text-slate-900">$500,000</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                </div>
                <div className="text-xs text-slate-500 mt-1">$40,000 used this month</div>
              </div>
            </div>
          </div>

          {/* Recent Withdrawals */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Withdrawals</h3>
            <div className="space-y-3">
              {loadingWithdrawals ? (
                <div className="text-center py-4 text-slate-500 text-sm">Loading...</div>
              ) : recentWithdrawals.length > 0 ? (
                recentWithdrawals.map((withdrawal) => (
                  <div key={withdrawal._id} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-red-600">
                        -${withdrawal.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-slate-500">{withdrawal.description.split(':')[0]}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-medium flex items-center gap-1 ${
                        withdrawal.status === 'completed' ? 'text-emerald-600' : 
                        withdrawal.status === 'pending' ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {withdrawal.status === 'completed' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {withdrawal.status === 'pending' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        )}
                        {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-slate-500 text-sm">No recent withdrawals</div>
              )}
            </div>
          </div>

          {/* Processing Time */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="text-sm font-semibold text-blue-900 mb-1">Processing Time</div>
                <div className="text-xs text-blue-700">
                  Crypto: Instant - 1 hour<br />
                  Bank: 1-3 business days<br />
                  PayPal: Instant - 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
