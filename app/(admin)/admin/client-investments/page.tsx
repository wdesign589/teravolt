'use client';

import { useEffect, useState } from 'react';

interface ClientInvestment {
  _id: string;
  userId: string;
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
  percentageReturn: number;
  createdAt: string;
  profitDistributions: Array<{
    amount: number;
    date: string;
    balanceAfter: number;
  }>;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    balance: number;
  };
}

interface Stats {
  totalInvestments: number;
  activeInvestments: number;
  completedInvestments: number;
  totalInvestedAmount: number;
  totalProfitDistributed: number;
  totalExpectedReturns: number;
}

export default function ClientInvestmentsPage() {
  const [investments, setInvestments] = useState<ClientInvestment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await fetch('/api/admin/client-investments');
      const data = await response.json();
      
      if (response.ok) {
        setInvestments(data.investments || []);
        setStats(data.stats || null);
      }
    } catch (error) {
      console.error('Error fetching client investments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInvestments = investments.filter(inv => {
    const matchesFilter = filter === 'all' || inv.status === filter;
    const matchesSearch = searchTerm === '' || 
      inv.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.investmentPlanName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
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
          <h1 className="text-3xl font-bold text-slate-900">Client Investments</h1>
          <p className="text-slate-600 mt-1">Monitor and manage all client investments</p>
        </div>
        <button
          onClick={fetchInvestments}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalInvestments}</div>
            <div className="text-blue-100 text-sm font-medium">Total Investments</div>
            <div className="mt-2 pt-2 border-t border-white/20 text-sm">
              <span className="text-blue-200">{stats.activeInvestments} active</span> · 
              <span className="text-blue-200 ml-1">{stats.completedInvestments} completed</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">${stats.totalInvestedAmount.toLocaleString()}</div>
            <div className="text-emerald-100 text-sm font-medium">Total Invested</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">${stats.totalProfitDistributed.toLocaleString()}</div>
            <div className="text-purple-100 text-sm font-medium">Profit Distributed</div>
            <div className="mt-2 pt-2 border-t border-white/20 text-sm">
              <span className="text-purple-200">Expected: ${stats.totalExpectedReturns.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Filter:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All ({investments.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === 'active'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Active ({stats?.activeInvestments || 0})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === 'completed'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Completed ({stats?.completedInvestments || 0})
              </button>
            </div>
          </div>

          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by client name, email, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Investments Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-slate-600 mt-4">Loading investments...</p>
        </div>
      ) : filteredInvestments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-200 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No investments found</h3>
          <p className="text-slate-600">
            {searchTerm ? 'Try adjusting your search terms' : 'No client investments yet'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Investment Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Profit</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredInvestments.map((investment) => {
                  const daysRemaining = getDaysRemaining(investment.endDate);
                  
                  return (
                    <tr key={investment._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-slate-900">
                            {investment.user.firstName} {investment.user.lastName}
                          </div>
                          <div className="text-sm text-slate-500">{investment.user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{investment.investmentPlanName}</div>
                        <div className="text-sm text-slate-500">{investment.percentageReturn}% return</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">${investment.amount.toLocaleString()}</div>
                        <div className="text-sm text-slate-500">${investment.dailyProfit.toFixed(2)}/day</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-emerald-600">${investment.totalProfit.toLocaleString()}</div>
                        <div className="text-sm text-slate-500">of ${investment.expectedReturn.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(investment.status)}`}>
                          {investment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{investment.durationDays} days</div>
                        <div className="text-sm text-slate-500">
                          {investment.status === 'active' ? (
                            <span className="text-amber-600">{daysRemaining}d remaining</span>
                          ) : (
                            <span className="text-blue-600">Completed</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">
                          {new Date(investment.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(investment.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredInvestments.length}</span> of{' '}
              <span className="font-semibold text-slate-900">{investments.length}</span> investments
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
