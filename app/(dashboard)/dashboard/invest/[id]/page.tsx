'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

export default function InvestmentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const user = useAuthStore((state) => state.user);
  const refetchUser = useAuthStore((state) => state.refetchUser);
  
  const [plan, setPlan] = useState<InvestmentPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [investing, setInvesting] = useState(false);
  const [amount, setAmount] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const response = await fetch('/api/investments');
      const data = await response.json();
      
      if (data.success) {
        const foundPlan = data.investments.find((p: InvestmentPlan) => p.id === params.id);
        if (foundPlan) {
          setPlan(foundPlan);
          // Set default amount to minimum
          setAmount(foundPlan.minimumAmount.toString());
        }
      }
    } catch (error) {
      console.error('Error fetching plan:', error);
      alert('Failed to load investment plan');
      router.push('/dashboard/invest');
    } finally {
      setLoading(false);
    }
  };

  const calculateProjections = () => {
    if (!plan || !amount) return null;
    
    const investmentAmount = Number(amount);
    const dailyProfit = (investmentAmount * plan.dailyReturn) / 100;
    const totalReturn = (investmentAmount * plan.percentageReturn) / 100;
    const finalAmount = investmentAmount + totalReturn;
    
    return {
      investmentAmount,
      dailyProfit,
      totalReturn,
      finalAmount,
    };
  };

  const handleInvest = async () => {
    if (!plan || !amount) return;

    const investmentAmount = Number(amount);

    // Validation
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      alert('Please enter a valid investment amount');
      return;
    }

    if (investmentAmount < plan.minimumAmount || investmentAmount > plan.maximumAmount) {
      alert(`Investment amount must be between $${plan.minimumAmount.toLocaleString()} and $${plan.maximumAmount.toLocaleString()}`);
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
          investmentPlanId: plan.id,
          amount: investmentAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create investment');
      }

      alert('Investment created successfully!');
      
      // Refresh user data to update balance
      await refetchUser();
      
      // Redirect to dashboard or investments page
      router.push('/dashboard');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Investment Plan Not Found</h2>
        <button
          onClick={() => router.push('/dashboard/invest')}
          className="mt-4 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-all"
        >
          Browse Plans
        </button>
      </div>
    );
  }

  const projections = calculateProjections();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/dashboard/invest')}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{plan.name}</h1>
          <p className="text-slate-600 mt-1">Complete your investment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Investment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plan Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h2>
                <p className="text-slate-600">{plan.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getRiskColor(plan.risk)}`}>
                {plan.risk} Risk
              </span>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{plan.percentageReturn}%</div>
                <div className="text-sm text-slate-600 mt-1">Total Return</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{plan.durationDays}</div>
                <div className="text-sm text-slate-600 mt-1">Days</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{plan.dailyReturn.toFixed(2)}%</div>
                <div className="text-sm text-slate-600 mt-1">Daily</div>
              </div>
            </div>

            {/* Features */}
            {plan.features && plan.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Features & Benefits</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Investment Amount */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Investment Amount</h3>
            
            <div className="mb-4">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Enter Amount (${plan.minimumAmount.toLocaleString()} - ${plan.maximumAmount.toLocaleString()})
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">$</span>
                <input
                  type="number"
                  min={plan.minimumAmount}
                  max={plan.maximumAmount}
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border-2 border-slate-200 rounded-2xl text-xl font-bold focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder={plan.minimumAmount.toString()}
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Available Balance: <span className="font-semibold text-slate-900">${user?.balance?.toLocaleString() || '0.00'}</span>
              </p>
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[plan.minimumAmount, plan.minimumAmount * 2, plan.minimumAmount * 5, plan.maximumAmount].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset.toString())}
                  className="px-4 py-2 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-xl text-sm font-semibold transition-all"
                >
                  ${preset.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
              />
              <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer">
                I understand that this investment will be locked for <span className="font-semibold text-slate-900">{plan.durationDays} days</span> and 
                I accept the <span className="text-emerald-600 font-semibold">terms and conditions</span> of this investment plan. 
                Daily profits will be automatically credited to my account balance.
              </label>
            </div>
          </div>
        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white sticky top-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Investment Summary</h3>
            
            {projections && (
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">Investment Amount</span>
                    <span className="font-bold">${projections.investmentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Duration</span>
                    <span className="font-bold">{plan.durationDays} days</span>
                  </div>
                </div>

                <div className="pb-4 border-b border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">Daily Profit</span>
                    <span className="font-bold text-emerald-400">${projections.dailyProfit.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Return</span>
                    <span className="font-bold text-emerald-400">${projections.totalReturn.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-4">
                  <div className="text-sm text-emerald-200 mb-1">Final Amount</div>
                  <div className="text-3xl font-bold">${projections.finalAmount.toLocaleString()}</div>
                  <div className="text-sm text-emerald-200 mt-1">
                    {((projections.totalReturn / projections.investmentAmount) * 100).toFixed(2)}% profit
                  </div>
                </div>

                <button
                  onClick={handleInvest}
                  disabled={investing || !acceptedTerms || !amount}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl"
                >
                  {investing ? 'Processing...' : 'Confirm Investment'}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  By confirming, you agree to lock your funds for the investment period
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
