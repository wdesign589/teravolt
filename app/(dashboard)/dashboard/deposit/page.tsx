'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/stores/useAuthStore';

interface Wallet {
  _id: string;
  symbol: string;
  name: string;
  address: string;
  qrCodeUrl: string;
  network?: string;
  isActive: boolean;
}

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  createdAt: string;
}

export default function DepositPage() {
  const user = useAuthStore((state) => state.user);
  const [selectedMethod, setSelectedMethod] = useState('crypto');
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitWallet, setSubmitWallet] = useState<Wallet | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentDeposits, setRecentDeposits] = useState<Transaction[]>([]);
  const [loadingDeposits, setLoadingDeposits] = useState(true);
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string>('');
  const [submitForm, setSubmitForm] = useState({
    transactionHash: '',
    amount: '',
  });

  useEffect(() => {
    fetchWallets();
    fetchRecentDeposits();
  }, []);

  const fetchWallets = async () => {
    try {
      const response = await fetch('/api/wallets');
      if (response.ok) {
        const data = await response.json();
        setWallets(data.wallets);
        if (data.wallets.length > 0) {
          setSelectedWallet(data.wallets[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch wallets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentDeposits = async () => {
    try {
      const response = await fetch('/api/transactions?type=deposit&limit=3');
      if (response.ok) {
        const data = await response.json();
        setRecentDeposits(data.transactions || []);
      }
    } catch (error) {
      console.error('Failed to fetch deposits:', error);
    } finally {
      setLoadingDeposits(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitWallet || !proofImage) return;

    setIsSubmitting(true);
    try {
      // Upload proof image first
      const formData = new FormData();
      formData.append('file', proofImage);
      
      const uploadResponse = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload proof image');
      }

      const { url: proofUrl } = await uploadResponse.json();

      // Submit transaction
      const response = await fetch('/api/deposit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletSymbol: submitWallet.symbol,
          transactionHash: submitForm.transactionHash,
          amount: parseFloat(submitForm.amount),
          proofUrl,
        }),
      });

      if (response.ok) {
        alert('Deposit submitted successfully! Your transaction is pending approval.');
        setShowSubmitModal(false);
        setSubmitForm({ transactionHash: '', amount: '' });
        setProofImage(null);
        setProofPreview('');
        fetchRecentDeposits();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit deposit');
      }
    } catch (error) {
      console.error('Error submitting deposit:', error);
      alert('Failed to submit deposit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openSubmitModal = (wallet: Wallet) => {
    setSubmitWallet(wallet);
    setShowSubmitModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Deposit Funds</h1>
        <p className="text-slate-600 mt-1">Add funds to your account securely and instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deposit Form - Left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Select Payment Method</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  id: 'crypto', 
                  name: 'Cryptocurrency',
                  icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                },
                { 
                  id: 'bank', 
                  name: 'Bank Transfer',
                  icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
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
                  <div className="text-sm font-semibold text-slate-900">{method.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Crypto Deposit */}
          {selectedMethod === 'crypto' && (
            loading ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center">
                <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-slate-600 mt-4">Loading wallets...</p>
              </div>
            ) : wallets.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center">
                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-600">No wallet addresses available at the moment</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Wallet Selection */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Select Cryptocurrency</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet._id}
                        onClick={() => setSelectedWallet(wallet)}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          selectedWallet?._id === wallet._id
                            ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="text-sm font-bold text-slate-900">{wallet.symbol.replace('_', ' ')}</div>
                        <div className="text-xs text-slate-500 mt-1">{wallet.name}</div>
                        {wallet.network && (
                          <div className="text-xs text-slate-400 mt-1">{wallet.network}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wallet Display */}
                {selectedWallet && (
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 border-2 border-slate-200 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedWallet.name}</h3>
                        <p className="text-sm text-slate-600">{selectedWallet.network || 'Network'}</p>
                      </div>
                      <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                        {selectedWallet.symbol.replace('_', ' ')}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* QR Code */}
                      <div className="flex flex-col items-center">
                        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-lg">
                          {selectedWallet.qrCodeUrl ? (
                            <Image
                              src={selectedWallet.qrCodeUrl}
                              alt={`${selectedWallet.name} QR Code`}
                              width={200}
                              height={200}
                              className="w-48 h-48 object-contain"
                            />
                          ) : (
                            <div className="w-48 h-48 flex items-center justify-center">
                              <svg className="w-24 h-24 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mt-4 font-medium text-center">
                          Scan QR code with your wallet app
                        </p>
                      </div>

                      {/* Address Info */}
                      <div className="flex flex-col justify-center space-y-6">
                        <div>
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                            Deposit Address
                          </label>
                          <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                            <code className="text-sm font-mono text-slate-900 break-all block mb-3">
                              {selectedWallet.address}
                            </code>
                            <button
                              onClick={() => copyToClipboard(selectedWallet.address)}
                              className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                            >
                              {copied ? (
                                <>
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  Copy Address
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <div className="text-sm font-bold text-amber-900 mb-1">⚠️ Important</div>
                              <div className="text-xs text-amber-800">
                                Send only <strong>{selectedWallet.symbol.replace('_', ' ')}</strong> to this address.
                                {selectedWallet.network && ` Make sure to use the ${selectedWallet.network}.`}
                                {' '}Sending other assets may result in permanent loss.
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Submit Transaction Button */}
                        <button
                          onClick={() => openSubmitModal(selectedWallet)}
                          className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Submit Transaction
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          {/* Bank Transfer */}
          {selectedMethod === 'bank' && (
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200 shadow-xl">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="relative inline-flex">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Bank Transfer Deposits</h3>
                  <p className="text-slate-600">
                    For bank transfer deposits, please contact our support team
                  </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Live Chat</h4>
                    <p className="text-sm text-slate-600 mb-4">Available 24/7 for instant assistance</p>
                    <button className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all shadow-sm">
                      Start Chat
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Email Support</h4>
                    <p className="text-sm text-slate-600 mb-4">Response within 24 hours</p>
                    <button className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all shadow-sm">
                      Send Email
                    </button>
                  </div>
                </div>

                {/* Info Note */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-blue-900 mb-1">Why Contact Support?</div>
                      <div className="text-xs text-blue-800">
                        Our team will provide you with personalized bank transfer instructions, 
                        ensure secure processing, and answer any questions you may have.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Balance */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700">Current Balance</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              ${user?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
            </div>
            <div className="text-sm text-slate-500">Available for trading</div>
          </div>

          {/* Recent Deposits */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Deposits</h3>
            <div className="space-y-3">
              {loadingDeposits ? (
                <div className="text-center py-4 text-slate-500 text-sm">Loading...</div>
              ) : recentDeposits.length > 0 ? (
                recentDeposits.map((deposit) => (
                  <div key={deposit._id} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-slate-900">
                        +${deposit.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-slate-500">{deposit.description.split(':')[0]}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-medium flex items-center gap-1 ${
                        deposit.status === 'completed' ? 'text-emerald-600' : 
                        deposit.status === 'pending' ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {deposit.status === 'completed' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {deposit.status === 'pending' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        )}
                        {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(deposit.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-slate-500 text-sm">No recent deposits</div>
              )}
            </div>
          </div>

          {/* Support */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-sm font-semibold text-slate-900 mb-2">Need Help?</div>
              <div className="text-xs text-slate-600 mb-4">Our support team is available 24/7</div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Transaction Modal */}
      {showSubmitModal && submitWallet && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Submit Transaction</h2>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  setSubmitForm({ transactionHash: '', amount: '' });
                  setProofImage(null);
                  setProofPreview('');
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-emerald-900 text-sm">Wallet: {submitWallet.name}</span>
              </div>
              <div className="text-xs text-emerald-800">
                Submit your transaction details after sending {submitWallet.symbol.replace('_', ' ')} to our wallet address.
              </div>
            </div>

            <form onSubmit={handleSubmitTransaction} className="space-y-4">
              {/* Transaction Hash */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Transaction Hash *
                </label>
                <input
                  type="text"
                  required
                  value={submitForm.transactionHash}
                  onChange={(e) => setSubmitForm({ ...submitForm, transactionHash: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none text-slate-900 font-mono text-sm"
                  placeholder="Enter transaction hash"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Amount Deposited ($) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={submitForm.amount}
                  onChange={(e) => setSubmitForm({ ...submitForm, amount: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none text-slate-900"
                  placeholder="Enter amount in USD"
                />
              </div>

              {/* Proof Screenshot */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Proof of Payment *
                </label>
                
                {proofPreview && (
                  <div className="mb-4 flex justify-center">
                    <div className="w-48 h-48 bg-slate-50 rounded-xl border-2 border-slate-200 p-2 relative">
                      <Image
                        src={proofPreview}
                        alt="Payment Proof"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </div>
                )}

                <label className="block w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-center hover:border-emerald-500 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    {proofImage ? proofImage.name : 'Click to upload screenshot'}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmitModal(false);
                    setSubmitForm({ transactionHash: '', amount: '' });
                    setProofImage(null);
                    setProofPreview('');
                  }}
                  className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Transaction'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
