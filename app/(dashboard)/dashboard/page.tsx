'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import EmailVerificationBanner from '@/components/EmailVerificationBanner';
import { useAuthStore } from '@/stores/useAuthStore';

interface NewsItem {
  title: string;
  time: string;
  category: string;
  source: string;
}

interface Investment {
  _id: string;
  investmentPlanName: string;
  amount: number;
  expectedReturn: number;
  percentageReturn?: number;
  totalProfit: number;
  status: string;
  startDate: string;
  endDate: string;
}

export default function DashboardOverviewPage() {
  // Access user data from Zustand
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  
  const [selectedPeriod, setSelectedPeriod] = useState('1W');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState('CBOT:ZC1!');
  const [commodityData, setCommodityData] = useState<any[]>([]);
  const [commoditiesLoading, setCommoditiesLoading] = useState(true);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [investmentsLoading, setInvestmentsLoading] = useState(true);
  const [totalExpectedReturns, setTotalExpectedReturns] = useState(0);
  
  // Extract user statistics with fallbacks to 0
  const balance = user?.balance ?? 0;
  const totalIncome = user?.totalIncome ?? 0;
  const totalSpent = user?.totalSpent ?? 0;
  const totalInvestments = user?.totalInvestments ?? 0;
  const totalProfit = user?.totalProfit ?? 0;

  // Refresh user data on mount to ensure email verification status is current
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Fetch user investments
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setInvestmentsLoading(true);
        const response = await fetch('/api/user/investments');
        if (response.ok) {
          const data = await response.json();
          const allInvestments = data.investments || [];
          
          // Calculate total expected returns from all active investments
          const totalExpected = allInvestments
            .filter((inv: Investment) => inv.status === 'active')
            .reduce((sum: number, inv: Investment) => sum + (inv.expectedReturn || 0), 0);
          
          setTotalExpectedReturns(totalExpected);
          
          // Get only the top 3 most recent investments for display
          setInvestments(allInvestments.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch investments:', error);
      } finally {
        setInvestmentsLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  useEffect(() => {
    // Set agriculture and commodities market news
    const loadMarketNews = () => {
      setNews([
        { title: 'US Farmland Values Rise 7% Amid Strong Demand', time: '1 hour ago', category: 'Farmland', source: 'AgWeek' },
        { title: 'Corn Futures Surge on Export Demand Outlook', time: '2 hours ago', category: 'Commodities', source: 'Reuters' },
        { title: 'Lithium Prices Stabilize as EV Demand Grows', time: '3 hours ago', category: 'Energy', source: 'Bloomberg' },
        { title: 'Cattle Prices Hit 5-Year High on Supply Constraints', time: '4 hours ago', category: 'Livestock', source: 'AgriNews' },
        { title: 'Global Wheat Production Forecast Revised Upward', time: '5 hours ago', category: 'Crops', source: 'FAO' },
      ]);
      setNewsLoading(false);
    };

    loadMarketNews();
  }, []);

  useEffect(() => {
    // Set static agricultural investment data
    const loadCommodityData = () => {
      setCommodityData([
        { name: 'US Farmland', symbol: 'LAND', returns: '+11.2%', type: 'Farmland', description: 'Prime agricultural land investments' },
        { name: 'Cattle Operations', symbol: 'CATTLE', returns: '+18.5%', type: 'Livestock', description: 'Beef cattle farming operations' },
        { name: 'Corn Production', symbol: 'CORN', returns: '+15.3%', type: 'Crops', description: 'Commercial corn farming' },
        { name: 'Lithium Mining', symbol: 'LITH', returns: '+22.1%', type: 'Energy', description: 'Lithium extraction & processing' },
        { name: 'Wheat Farms', symbol: 'WHEAT', returns: '+12.8%', type: 'Crops', description: 'Wheat cultivation operations' },
        { name: 'Soybean Fields', symbol: 'SOY', returns: '+14.6%', type: 'Crops', description: 'Soybean production facilities' },
      ]);
      setCommoditiesLoading(false);
    };

    loadCommodityData();
  }, []);

  return (
    <div className="space-y-4">
      {/* Email Verification Banner */}
      <EmailVerificationBanner />
      
      {/* Top Section - 3 Column Layout: 4 Stats (2 cols) + Total Investment (1 col spanning 3 rows) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Columns - 4 Stat Cards + Quick Actions */}
        <div className="lg:col-span-2 space-y-6 ">
          {/* 3 Stat Cards in Horizontal Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Wallet Balance - Dark Green */}
            <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 rounded-2xl p-4 border border-emerald-700 shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs font-medium text-emerald-100">Wallet Balance</div>
                  <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-0.5">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-emerald-200">Available Balance</div>
              </div>
            </div>

            {/* Income */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="text-xs font-medium text-slate-500">Income</div>
                <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-0.5">
                ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-500">Total Earnings</div>
            </div>

            {/* Spent */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="text-xs font-medium text-slate-500">Spent</div>
                <div className="w-6 h-6 bg-orange-50 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-0.5">
                ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-500">Total Withdrawals</div>
            </div>
          </div>

          {/* Quick Actions - Professional Design */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
            <div className="mb-3">
              <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
              <p className="text-xs text-slate-500 mt-0.5">Access your most used banking features</p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {/* Deposit */}
              <a href="/dashboard/deposit" className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="w-11 h-11 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-900 text-center">Deposit</span>
              </a>

              {/* Invest */}
              <a href="/dashboard/invest" className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-900 text-center">Invest</span>
              </a>

              {/* Withdraw */}
              <a href="/dashboard/withdraw" className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-900 text-center">Withdraw</span>
              </a>

              {/* Copy Trading */}
              <a href="/dashboard/copy-trader" className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="w-11 h-11 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-900 text-center">Copy Trading</span>
              </a>

              {/* Profit */}
              <a href="/dashboard/profit" className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-900 text-center">Profit</span>
              </a>

              {/* Settings */}
              <a href="/dashboard/settings" className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="w-11 h-11 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-900 text-center">Settings</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Total Investment Card */}
        <div className="lg:col-span-1 ">
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white/90">Total Investment</span>
              </div>
              
              {/* Amount */}
              <div className="mb-4">
                <div className="text-3xl font-bold mb-1.5">
                  ${totalInvestments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                    ${totalExpectedReturns.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-xs text-white/80">Expected Return</span>
                </div>
              </div>

              {/* Holdings breakdown */}
              <div className="space-y-3">
                {investmentsLoading ? (
                  // Loading skeleton
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div className="h-3 bg-white/20 rounded w-24 animate-pulse"></div>
                        <div className="space-y-1">
                          <div className="h-3 bg-white/20 rounded w-16 animate-pulse"></div>
                          <div className="h-2 bg-white/20 rounded w-12 animate-pulse ml-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : investments.length > 0 ? (
                  investments.map((investment, i) => {
                    const percentageEarned = investment.expectedReturn > 0
                      ? ((investment.totalProfit / investment.expectedReturn) * 100).toFixed(1)
                      : '0.0';
                    
                    return (
                      <div key={investment._id} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white">
                            {investment.investmentPlanName}
                          </div>
                          <div className="text-xs text-white/60 mt-0.5">
                            {investment.status === 'active' ? 'Active' : investment.status === 'completed' ? 'Completed' : 'Pending'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">
                            ${investment.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-emerald-300 flex items-center justify-end gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            {percentageEarned}%
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center">
                    <svg className="w-12 h-12 mx-auto text-white/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-sm text-white/60 mb-3">No active investments yet</p>
                    <Link
                      href="/dashboard/invest"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold text-white transition-colors"
                    >
                      Start Investing
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TradingView Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart - Left 2/3 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Market Overview</h2>
                <p className="text-sm text-slate-500 mt-1">Real-time crypto & stock analysis</p>
              </div>
              <div className="flex items-center gap-2">
                {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      selectedPeriod === period
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset Selector */}
            <div className="mb-4">
              <select 
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <optgroup label="🌾 Agricultural Commodities">
                  <option value="CBOT:ZC1!">Corn Futures</option>
                  <option value="CBOT:ZW1!">Wheat Futures</option>
                  <option value="CBOT:ZS1!">Soybean Futures</option>
                  <option value="CME:LE1!">Live Cattle Futures</option>
                  <option value="CME:GF1!">Feeder Cattle Futures</option>
                  <option value="CME:HE1!">Lean Hogs Futures</option>
                  <option value="NYMEX:CL1!">Crude Oil Futures</option>
                  <option value="COMEX:GC1!">Gold Futures</option>
                </optgroup>
                <optgroup label="🔋 Energy & Lithium">
                  <option value="NYSE:ALB">Albemarle Corp (Lithium)</option>
                  <option value="NYSE:SQM">Sociedad Química (Lithium)</option>
                  <option value="NYSE:LAC">Lithium Americas</option>
                  <option value="NASDAQ:LTHM">Livent Corporation</option>
                </optgroup>
                <optgroup label="🌱 Agricultural Stocks">
                  <option value="NYSE:DE">Deere & Company (Farm Equipment)</option>
                  <option value="NYSE:ADM">Archer-Daniels-Midland (Agribusiness)</option>
                  <option value="NYSE:BG">Bunge Limited (Agribusiness)</option>
                  <option value="NYSE:CTVA">Corteva Agriscience (Seeds)</option>
                  <option value="NYSE:NTR">Nutrien Ltd (Fertilizers)</option>
                  <option value="NYSE:MOS">Mosaic Company (Fertilizers)</option>
                </optgroup>
              </select>
            </div>

            {/* TradingView Widget Container */}
            <div className="relative w-full h-[350px] bg-slate-50 rounded-2xl overflow-hidden">
              {/* TradingView Embed - Using iframe */}
              <iframe
                key={selectedSymbol}
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${encodeURIComponent(selectedSymbol)}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget_new&utm_campaign=chart&utm_term=${encodeURIComponent(selectedSymbol)}`}
                className="w-full h-full border-0"
                title="TradingView Chart"
              />
            </div>
          </div>
        </div>

        {/* Right 1/3 - Market News from API */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-[450px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Market News</h3>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            
            {newsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse pb-4 border-b border-slate-100 last:border-0">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item, i) => (
                  <div key={i} className="pb-4 border-b border-slate-100 last:border-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-slate-900 text-sm leading-tight">{item.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-semibold">
                        {item.category}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">{item.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Performing Assets */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Top Performing Assets</h2>
          <Link href="/dashboard/invest" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: 'Iowa Farmland', date: 'Q1 2024 - Q4 2024', price: '$125,000', change: '+12.4%', positive: true, amount: '$15,500', icon: '🌾' },
            { name: 'Texas Cattle Ranch', date: 'Jan 24 - Dec 24', price: '$89,500', change: '+18.2%', positive: true, amount: '$16,290', icon: '🐄' },
            { name: 'Lithium Processing', date: 'Mar 24 - Mar 25', price: '$250,000', change: '+24.5%', positive: true, amount: '$61,250', icon: '🔋' },
            { name: 'Nebraska Corn Farm', date: 'Apr 24 - Oct 24', price: '$67,800', change: '+15.8%', positive: true, amount: '$10,712', icon: '🌽' },
          ].map((asset, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl flex items-center justify-center text-xl">
                    {asset.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{asset.name}</div>
                    <div className="text-xs text-slate-500">{asset.date}</div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-slate-400 hover:text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Value</span>
                  <span className="text-sm font-bold text-slate-900">{asset.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Amount</span>
                  <span className="text-sm font-semibold text-slate-700">{asset.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Change</span>
                  <span className={`text-sm font-bold ${asset.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {asset.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agricultural Investment Opportunities Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 rounded-3xl p-6 border border-emerald-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              🌾 Investment Opportunities
            </h2>
            <p className="text-sm text-slate-600 mt-1">Top performing agricultural & energy assets</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-600">Updated</span>
          </div>
        </div>

        {commoditiesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white/50 rounded-2xl p-4 h-32"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commodityData.map((asset, i) => {
              const typeIcons: Record<string, string> = {
                'Farmland': '🏞️',
                'Livestock': '🐄',
                'Crops': '🌽',
                'Energy': '🔋',
              };
              const typeColors: Record<string, string> = {
                'Farmland': 'bg-amber-100 text-amber-700',
                'Livestock': 'bg-orange-100 text-orange-700',
                'Crops': 'bg-green-100 text-green-700',
                'Energy': 'bg-blue-100 text-blue-700',
              };
              
              return (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 hover:shadow-xl transition-all transform hover:-translate-y-1 group relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center text-xl">
                        {typeIcons[asset.type] || '📊'}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{asset.name}</div>
                        <div className="text-xs text-slate-500 uppercase">{asset.symbol}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-600">{asset.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Annual Returns</span>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100">
                        <span className="text-xs font-bold text-emerald-600">
                          ↑ {asset.returns}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${typeColors[asset.type] || 'bg-slate-100 text-slate-600'}`}>
                          {asset.type}
                        </span>
                        <span className="font-semibold text-emerald-600">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link 
            href="/dashboard/invest"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            Explore All Investments
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}

