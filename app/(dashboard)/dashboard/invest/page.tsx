'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minimumAmount: number;
  maximumAmount: number;
  durationDays: number;
  percentageReturn: number;
  dailyReturn: number;
  features: string[];
  risk: 'low' | 'medium' | 'high';
  category: string;
}

export default function InvestPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const refetchUser = useAuthStore((state) => state.refetchUser);
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [amount, setAmount] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [investing, setInvesting] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/investments');
      const data = await response.json();
      
      if (data.success) {
        setPlans(data.investments);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvestClick = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setAmount(plan.minimumAmount.toString());
    setAcceptedTerms(false);
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setAmount('');
    setAcceptedTerms(false);
    setInvesting(false);
  };

  const calculateProjections = () => {
    if (!selectedPlan || !amount) return null;
    
    const investmentAmount = Number(amount);
    if (isNaN(investmentAmount)) return null;
    
    const dailyProfit = (investmentAmount * selectedPlan.dailyReturn) / 100;
    const totalReturn = (investmentAmount * selectedPlan.percentageReturn) / 100;
    const finalAmount = investmentAmount + totalReturn;
    
    return {
      investmentAmount,
      dailyProfit,
      totalReturn,
      finalAmount,
    };
  };

  const handleInvest = async () => {
    if (!selectedPlan || !amount) return;

    const investmentAmount = Number(amount);

    // Validation
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      alert('Please enter a valid investment amount');
      return;
    }

    if (investmentAmount < selectedPlan.minimumAmount || investmentAmount > selectedPlan.maximumAmount) {
      alert(`Investment amount must be between $${selectedPlan.minimumAmount.toLocaleString()} and $${selectedPlan.maximumAmount.toLocaleString()}`);
      return;
    }

    if ((user?.balance || 0) < investmentAmount) {
      alert('Insufficient balance. Please deposit funds first.');
      return;
    }

    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setInvesting(true);

    try {
      const response = await fetch('/api/user/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          investmentPlanId: selectedPlan.id,
          amount: investmentAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create investment');
      }

      alert('🎉 Investment created successfully! You will receive daily profits automatically.');
      
      // Refresh user data to update balance
      await refetchUser();
      
      // Close modal and refresh plans
      closeModal();
      fetchPlans();
    } catch (error: any) {
      console.error('Error creating investment:', error);
      alert(error.message || 'Failed to create investment');
    } finally {
      setInvesting(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskBorderColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'border-green-200 hover:border-green-400';
      case 'medium':
        return 'border-yellow-200 hover:border-yellow-400';
      case 'high':
        return 'border-red-200 hover:border-red-400';
      default:
        return 'border-slate-200 hover:border-slate-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Investment Plans</h1>
        <p className="text-lg text-slate-600">Choose the perfect plan for your financial goals and start earning daily returns</p>
      </div>

      {/* User Balance Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 mb-2">Available Balance</p>
            <h2 className="text-4xl font-bold">${user?.balance?.toLocaleString() || '0.00'}</h2>
            <p className="text-emerald-200 text-sm mt-2">Ready to invest</p>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Investment Plans Grid */}
      {plans.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-300">
          <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Investment Plans Available</h3>
          <p className="text-slate-600">Check back later for investment opportunities</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-6 border-2 ${getRiskBorderColor(plan.risk)} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                index === 1 ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
              }`}
            >
              {/* Popular Badge */}
              {index === 1 && (
                <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold rounded-full mb-4 shadow-lg">
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Risk Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getRiskColor(plan.risk)}`}>
                  {plan.risk} Risk
                </span>
                {plan.category && (
                  <span className="text-xs text-slate-500 font-semibold">{plan.category}</span>
                )}
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-600 text-sm mb-6 line-clamp-2">{plan.description}</p>

              {/* Returns Display */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-1">{plan.percentageReturn}%</div>
                  <div className="text-sm text-slate-600">Total Return</div>
                  <div className="text-xs text-slate-500 mt-1">{plan.dailyReturn.toFixed(2)}% daily</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold text-slate-900">{plan.durationDays} days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Min Amount</span>
                  <span className="font-semibold text-slate-900">${plan.minimumAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Max Amount</span>
                  <span className="font-semibold text-slate-900">${plan.maximumAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Features */}
              {plan.features && plan.features.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-semibold text-slate-700 mb-2">Features:</div>
                  <ul className="space-y-1.5">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Invest Button */}
              <button
                onClick={() => handleInvestClick(plan)}
                className={`w-full py-3.5 rounded-2xl font-bold text-white transition-all shadow-lg hover:shadow-xl ${
                  index === 1
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600'
                    : 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700'
                }`}
              >
                Invest Now →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Investment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl my-8 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedPlan.name}</h2>
                  <p className="text-emerald-100 text-sm">Complete your investment</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Investment Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Plan Summary */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{selectedPlan.name}</h3>
                        <p className="text-slate-600 text-sm">{selectedPlan.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getRiskColor(selectedPlan.risk)}`}>
                        {selectedPlan.risk} Risk
                      </span>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl p-3 text-center border border-slate-200">
                        <div className="text-2xl font-bold text-emerald-600">{selectedPlan.percentageReturn}%</div>
                        <div className="text-xs text-slate-600 mt-1">Total Return</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-slate-200">
                        <div className="text-2xl font-bold text-blue-600">{selectedPlan.durationDays}</div>
                        <div className="text-xs text-slate-600 mt-1">Days</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-slate-200">
                        <div className="text-2xl font-bold text-purple-600">{selectedPlan.dailyReturn.toFixed(2)}%</div>
                        <div className="text-xs text-slate-600 mt-1">Daily</div>
                      </div>
                    </div>
                  </div>

                  {/* Investment Amount Section */}
                  <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Investment Amount
                    </h3>
                    
                    <div className="mb-4">
                      <label className="text-sm font-semibold text-slate-700 mb-2 block">
                        Enter Amount (${selectedPlan.minimumAmount.toLocaleString()} - ${selectedPlan.maximumAmount.toLocaleString()})
                      </label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-2xl font-bold">$</span>
                        <input
                          type="number"
                          min={selectedPlan.minimumAmount}
                          max={selectedPlan.maximumAmount}
                          step="0.01"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 border-slate-300 rounded-xl text-2xl font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all"
                          placeholder={selectedPlan.minimumAmount.toString()}
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            Available: <span className="font-semibold text-slate-900">${user?.balance?.toLocaleString() || '0.00'}</span>
                          </span>
                        </div>
                        {amount && (() => {
                          const amountNum = Number(amount);
                          if (isNaN(amountNum) || amountNum <= 0) {
                            return <p className="text-red-600 text-sm font-semibold flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              Please enter a valid amount
                            </p>;
                          }
                          if (amountNum < selectedPlan.minimumAmount) {
                            return <p className="text-red-600 text-sm font-semibold flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              Minimum investment is ${selectedPlan.minimumAmount.toLocaleString()}
                            </p>;
                          }
                          if (amountNum > selectedPlan.maximumAmount) {
                            return <p className="text-red-600 text-sm font-semibold flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              Maximum investment is ${selectedPlan.maximumAmount.toLocaleString()}
                            </p>;
                          }
                          if (amountNum > (user?.balance || 0)) {
                            return <p className="text-red-600 text-sm font-semibold flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              Insufficient balance - Please deposit funds first
                            </p>;
                          }
                          return <p className="text-green-600 text-sm font-semibold flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Amount is valid
                          </p>;
                        })()}
                      </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-slate-700 mb-2 block">Quick Select</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          selectedPlan.minimumAmount,
                          Math.min(selectedPlan.minimumAmount * 2, selectedPlan.maximumAmount),
                          Math.min(selectedPlan.minimumAmount * 5, selectedPlan.maximumAmount),
                          selectedPlan.maximumAmount
                        ].filter((val, idx, arr) => arr.indexOf(val) === idx).map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setAmount(preset.toString())}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                              Number(amount) === preset
                                ? 'bg-emerald-600 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-700'
                            }`}
                          >
                            ${preset.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Features List */}
                    {selectedPlan.features && selectedPlan.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">What You Get</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedPlan.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="terms-modal"
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-amber-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                        />
                        <label htmlFor="terms-modal" className="text-sm text-slate-700 cursor-pointer flex-1">
                          I understand that my funds will be locked for <span className="font-bold text-slate-900">{selectedPlan.durationDays} days</span> and 
                          I accept the terms and conditions. Daily profits will be automatically credited to my account balance.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Investment Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white sticky top-0 shadow-2xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Investment Summary
                    </h3>
                    
                    {(() => {
                      const projections = calculateProjections();
                      if (!projections) {
                        return (
                          <div className="text-center py-8 text-slate-400">
                            <p className="text-sm">Enter an amount to see projections</p>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-4">
                          <div className="pb-4 border-b border-white/10">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-slate-300 text-sm">Investment</span>
                              <span className="font-bold text-xl">${projections.investmentAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-300 text-sm">Duration</span>
                              <span className="font-semibold">{selectedPlan.durationDays} days</span>
                            </div>
                          </div>

                          <div className="pb-4 border-b border-white/10">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-slate-300 text-sm">Daily Profit</span>
                              <span className="font-bold text-emerald-400 text-lg">${projections.dailyProfit.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-300 text-sm">Total Return</span>
                              <span className="font-bold text-emerald-400 text-lg">${projections.totalReturn.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-4 border border-emerald-400/30">
                            <div className="text-sm text-emerald-200 mb-1">Expected Final Amount</div>
                            <div className="text-3xl font-bold mb-2">${projections.finalAmount.toLocaleString()}</div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="flex items-center gap-1 text-emerald-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span className="font-bold">+{selectedPlan.percentageReturn}%</span>
                              </div>
                              <span className="text-emerald-200">profit</span>
                            </div>
                          </div>

                          <button
                            onClick={handleInvest}
                            disabled={investing || !acceptedTerms || !amount || Number(amount) < selectedPlan.minimumAmount || Number(amount) > selectedPlan.maximumAmount || Number(amount) > (user?.balance || 0)}
                            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2"
                          >
                            {investing ? (
                              <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Confirm Investment
                              </>
                            )}
                          </button>

                          <p className="text-xs text-slate-400 text-center leading-relaxed">
                            By confirming, you agree to lock your funds for the investment period. Daily profits will be credited automatically.
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
