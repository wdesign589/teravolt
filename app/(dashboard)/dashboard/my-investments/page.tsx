'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

interface UserInvestment {
  _id: string;
  investmentPlanName: string;
  amount: number;
  expectedReturn: number;
  dailyProfit: number;
  totalProfit: number;
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  completedAt?: string;
  durationDays: number;
  percentageReturn?: number;
  profitDistributions: Array<{
    amount: number;
    date: string;
    balanceAfter: number;
  }>;
}

export default function MyInvestmentsPage() {
  const user = useAuthStore((state) => state.user);
  const [investments, setInvestments] = useState<UserInvestment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await fetch('/api/user/investments');
      const data = await response.json();
      
      if (response.ok) {
        setInvestments(data.investments || []);
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    totalInvested: investments.reduce((sum, inv) => sum + inv.amount, 0),
    activeInvestments: investments.filter(inv => inv.status === 'active').length,
    totalProfit: investments.reduce((sum, inv) => sum + inv.totalProfit, 0),
    completedInvestments: investments.filter(inv => inv.status === 'completed').length,
  };

  const filteredInvestments = investments.filter(inv => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
      case 'completed':
        return 'text-slate-700 bg-slate-50 border border-slate-200';
      case 'cancelled':
        return 'text-slate-500 bg-slate-50 border border-slate-200';
      default:
        return 'text-slate-600 bg-slate-50 border border-slate-200';
    }
  };

  const calculateProgress = (investment: UserInvestment) => {
    // Calculate progress based on profit earned vs expected return
    if (investment.expectedReturn === 0) return 0;
    
    const profitPercentage = (investment.totalProfit / investment.expectedReturn) * 100;
    
    // Cap at 100%
    return Math.min(100, Math.round(profitPercentage));
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = Date.now();
    const diff = end - now;
    
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Investments</h1>
          <p className="text-slate-600 mt-1">Track and manage your investment portfolio</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1 text-slate-900">${stats.totalInvested.toLocaleString()}</div>
          <div className="text-slate-600 text-sm font-medium">Total Invested</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1 text-slate-900">{stats.activeInvestments}</div>
          <div className="text-slate-600 text-sm font-medium">Active Investments</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1 text-emerald-600">${stats.totalProfit.toLocaleString()}</div>
          <div className="text-slate-600 text-sm font-medium">Total Profit Earned</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1 text-slate-900">{stats.completedInvestments}</div>
          <div className="text-slate-600 text-sm font-medium">Completed Investments</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">Filter:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All ({investments.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === 'active'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Active ({stats.activeInvestments})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Completed ({stats.completedInvestments})
            </button>
          </div>
        </div>
      </div>

      {/* Investments List */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-200 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-slate-600 mt-4 font-medium">Loading investments...</p>
        </div>
      ) : filteredInvestments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-200 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {filter === 'all' ? 'No investments yet' : `No ${filter} investments`}
          </h3>
          <p className="text-slate-600 mb-6">
            {filter === 'all' 
              ? 'Start investing today to grow your wealth' 
              : `You don't have any ${filter} investments at the moment`}
          </p>
          {filter === 'all' && (
            <a
              href="/dashboard/invest"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Browse Investment Plans
            </a>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredInvestments.map((investment) => {
            const progress = calculateProgress(investment);
            const daysRemaining = getDaysRemaining(investment.endDate);
            
            return (
              <div key={investment._id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{investment.investmentPlanName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(investment.status)}`}>
                        {investment.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Started {new Date(investment.startDate).toLocaleDateString()} · 
                      {investment.status === 'active' 
                        ? ` ${daysRemaining} days remaining` 
                        : ` Completed ${investment.completedAt ? new Date(investment.completedAt).toLocaleDateString() : ''}`
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Investment Amount</div>
                    <div className="text-2xl font-bold text-slate-900">${investment.amount.toLocaleString()}</div>
                  </div>
                </div>

                {/* Progress Bar (for active investments) */}
                {investment.status === 'active' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600 font-medium">Profit Progress</span>
                      <span className="text-emerald-600 font-bold">{progress}% earned</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-slate-500">${investment.totalProfit.toFixed(2)} earned</span>
                      <span className="text-slate-500">${investment.expectedReturn.toFixed(2)} total</span>
                    </div>
                  </div>
                )}

                {/* Investment Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Daily Profit</div>
                    <div className="text-lg font-bold text-slate-900">${investment.dailyProfit.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Profit Earned</div>
                    <div className="text-lg font-bold text-emerald-600">${investment.totalProfit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Expected Return</div>
                    <div className="text-lg font-bold text-slate-900">${investment.expectedReturn.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Return Rate</div>
                    <div className="text-lg font-bold text-slate-900">
                      {investment.percentageReturn 
                        ? `${investment.percentageReturn}%` 
                        : investment.amount > 0 
                          ? `${((investment.expectedReturn / investment.amount) * 100).toFixed(1)}%`
                          : '0%'
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
