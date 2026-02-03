'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

interface ProfitTransaction {
  _id: string;
  type: 'investment_return' | 'investment_completion' | 'copy_trading_return';
  amount: number;
  status: string;
  description: string;
  createdAt: string;
  investmentPlanName?: string;
  investmentId?: string;
}

interface ProfitStats {
  totalProfit: number;
  investmentProfit: number;
  copyTradingProfit: number;
  totalTransactions: number;
  averageProfit: number;
  monthlyProfits: { [key: string]: number };
  profitBySource: {
    investment: number;
    copyTrading: number;
  };
}

export default function ProfitHistoryPage() {
  const user = useAuthStore((state) => state.user);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [profitTransactions, setProfitTransactions] = useState<ProfitTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ProfitStats>({
    totalProfit: 0,
    investmentProfit: 0,
    copyTradingProfit: 0,
    totalTransactions: 0,
    averageProfit: 0,
    monthlyProfits: {},
    profitBySource: {
      investment: 0,
      copyTrading: 0,
    },
  });

  useEffect(() => {
    fetchProfitData();
  }, []);

  const fetchProfitData = async () => {
    try {
      setLoading(true);
      
      // Fetch investment returns
      const investmentResponse = await fetch('/api/transactions?type=investment_return&limit=100&status=completed');
      const investmentData = investmentResponse.ok ? await investmentResponse.json() : { transactions: [] };
      
      // Fetch investment completions
      const completionResponse = await fetch('/api/transactions?type=investment_completion&limit=100&status=completed');
      const completionData = completionResponse.ok ? await completionResponse.json() : { transactions: [] };
      
      // Fetch copy trading returns
      const copyTradingResponse = await fetch('/api/transactions?type=copy_trading_return&limit=100&status=completed');
      const copyTradingData = copyTradingResponse.ok ? await copyTradingResponse.json() : { transactions: [] };
      
      // Combine all profit transactions
      const allProfits = [
        ...(investmentData.transactions || []),
        ...(completionData.transactions || []),
        ...(copyTradingData.transactions || []),
      ];
      
      // Sort by date (most recent first)
      allProfits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setProfitTransactions(allProfits);
      calculateStats(allProfits);
    } catch (error) {
      console.error('Failed to fetch profit data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (transactions: ProfitTransaction[]) => {
    let totalProfit = 0;
    let investmentProfit = 0;
    let copyTradingProfit = 0;
    const monthlyProfits: { [key: string]: number } = {};
    
    transactions.forEach((transaction) => {
      const amount = transaction.amount;
      totalProfit += amount;
      
      // Categorize by source
      if (transaction.type === 'investment_return' || transaction.type === 'investment_completion') {
        investmentProfit += amount;
      } else if (transaction.type === 'copy_trading_return') {
        copyTradingProfit += amount;
      }
      
      // Calculate monthly profits
      const monthKey = new Date(transaction.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      monthlyProfits[monthKey] = (monthlyProfits[monthKey] || 0) + amount;
    });
    
    const averageProfit = transactions.length > 0 ? totalProfit / transactions.length : 0;
    
    setStats({
      totalProfit,
      investmentProfit,
      copyTradingProfit,
      totalTransactions: transactions.length,
      averageProfit,
      monthlyProfits,
      profitBySource: {
        investment: investmentProfit,
        copyTrading: copyTradingProfit,
      },
    });
  };

  const filterTransactionsByPeriod = (transactions: ProfitTransaction[]) => {
    if (selectedPeriod === 'all') return transactions;
    
    const now = new Date();
    const periodInDays = {
      '7d': 7,
      '1m': 30,
      '3m': 90,
      '1y': 365,
    }[selectedPeriod] || 0;
    
    if (periodInDays === 0) return transactions;
    
    const cutoffDate = new Date(now.getTime() - periodInDays * 24 * 60 * 60 * 1000);
    return transactions.filter((t) => new Date(t.createdAt) >= cutoffDate);
  };

  const getFilteredStats = () => {
    const filteredTransactions = filterTransactionsByPeriod(profitTransactions);
    
    let totalProfit = 0;
    let investmentProfit = 0;
    let copyTradingProfit = 0;
    
    filteredTransactions.forEach((transaction) => {
      const amount = transaction.amount;
      totalProfit += amount;
      
      if (transaction.type === 'investment_return' || transaction.type === 'investment_completion') {
        investmentProfit += amount;
      } else if (transaction.type === 'copy_trading_return') {
        copyTradingProfit += amount;
      }
    });
    
    return {
      totalProfit,
      investmentProfit,
      copyTradingProfit,
      count: filteredTransactions.length,
      averageProfit: filteredTransactions.length > 0 ? totalProfit / filteredTransactions.length : 0,
    };
  };

  const filteredStats = getFilteredStats();
  const filteredTransactions = filterTransactionsByPeriod(profitTransactions);
  
  // Calculate profit percentage breakdown
  const investmentPercentage = stats.totalProfit > 0 ? (stats.investmentProfit / stats.totalProfit) * 100 : 0;
  const copyTradingPercentage = stats.totalProfit > 0 ? (stats.copyTradingProfit / stats.totalProfit) * 100 : 0;

  // Get last 6 months for chart
  const getMonthlyChartData = () => {
    const months: { month: string; profit: number }[] = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        profit: stats.monthlyProfits[monthKey] || 0,
      });
    }
    
    return months;
  };

  const monthlyChartData = getMonthlyChartData();
  const maxMonthlyProfit = Math.max(...monthlyChartData.map((m) => m.profit), 1);

  const getTypeLabel = (type: string) => {
    switch (type) {
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

  const getTypeColor = (type: string) => {
    if (type === 'investment_return' || type === 'investment_completion') {
      return 'bg-blue-100 text-blue-700';
    }
    return 'bg-purple-100 text-purple-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profit data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profit History</h1>
        <p className="text-slate-600 mt-1">Track your earnings from investments and copy trading</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              All Time
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            ${stats.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500">Total Profit</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {investmentPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            ${stats.investmentProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500">Investment Profit</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              {copyTradingPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            ${stats.copyTradingProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500">Copy Trading Profit</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
              Avg
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            ${stats.averageProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500">Average Per Transaction</div>
        </div>
      </div>

      {/* Profit Breakdown by Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart - Source Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Profit by Source</h2>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="40" />
                {stats.totalProfit > 0 && (
                  <>
                    {/* Investment slice */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="40"
                      strokeDasharray={`${(investmentPercentage / 100) * 502.65} 502.65`}
                    />
                    {/* Copy Trading slice */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="40"
                      strokeDasharray={`${(copyTradingPercentage / 100) * 502.65} 502.65`}
                      strokeDashoffset={-((investmentPercentage / 100) * 502.65)}
                    />
                  </>
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-slate-900">
                  ${stats.totalProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-slate-500">Total</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold text-slate-900">Investments</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">
                  ${stats.investmentProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-slate-500">{investmentPercentage.toFixed(1)}%</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold text-slate-900">Copy Trading</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">
                  ${stats.copyTradingProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-slate-500">{copyTradingPercentage.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Last 6 Months</h2>
          <div className="h-64 flex items-end justify-between gap-3">
            {monthlyChartData.map((data, i) => {
              const heightPercentage = maxMonthlyProfit > 0 ? (data.profit / maxMonthlyProfit) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end" style={{ height: '200px' }}>
                    <div className="text-xs font-bold text-emerald-600 mb-1">
                      {data.profit > 0 ? `$${data.profit.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : ''}
                    </div>
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all hover:from-emerald-600 hover:to-emerald-500"
                      style={{ height: `${heightPercentage}%`, minHeight: data.profit > 0 ? '4px' : '0' }}
                    ></div>
                  </div>
                  <div className="text-xs font-semibold text-slate-600">{data.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Period Filter */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Filtered View</h2>
          <div className="flex items-center gap-2">
            {[
              { label: '7D', value: '7d' },
              { label: '1M', value: '1m' },
              { label: '3M', value: '3m' },
              { label: '1Y', value: '1y' },
              { label: 'All', value: 'all' },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedPeriod === period.value
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Period Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="text-sm text-slate-600 mb-1">Total Profit</div>
            <div className="text-2xl font-bold text-emerald-600">
              ${filteredStats.totalProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-sm text-slate-600 mb-1">Investment</div>
            <div className="text-2xl font-bold text-blue-600">
              ${filteredStats.investmentProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="text-sm text-slate-600 mb-1">Copy Trading</div>
            <div className="text-2xl font-bold text-purple-600">
              ${filteredStats.copyTradingProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Transactions</div>
            <div className="text-2xl font-bold text-slate-900">{filteredStats.count}</div>
          </div>
        </div>
      </div>

      {/* Profit Transactions Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Profit Transactions</h2>
          <div className="text-sm text-slate-600">
            Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-600 font-semibold mb-2">No profit transactions yet</p>
            <p className="text-sm text-slate-500">Your profits from investments and copy trading will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Description</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Type</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Profit</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.slice(0, 20).map((transaction) => (
                  <tr key={transaction._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="text-sm text-slate-900">
                        {new Date(transaction.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(transaction.createdAt).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm font-medium text-slate-900 max-w-md truncate">
                        {transaction.description}
                      </div>
                      {transaction.investmentPlanName && (
                        <div className="text-xs text-slate-500 mt-1">
                          {transaction.investmentPlanName}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getTypeColor(transaction.type)}`}>
                        {getTypeLabel(transaction.type)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-sm font-bold text-emerald-600">
                        +${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredTransactions.length > 20 && (
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Showing 20 of {filteredTransactions.length} transactions
            </p>
          </div>
        )}
      </div>

      {/* Summary by Month */}
      {Object.keys(stats.monthlyProfits).length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Monthly Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stats.monthlyProfits)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .slice(0, 8)
              .map(([month, profit]) => (
                <div key={month} className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="text-sm text-slate-600 mb-2">{month}</div>
                  <div className="text-xl font-bold text-emerald-600 mb-1">
                    +${profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-slate-500">Total Profit</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
