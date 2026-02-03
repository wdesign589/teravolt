'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import TraderCard from './TraderCard';

export default function CopyTradingPage() {
  const user = useAuthStore((state) => state.user);
  const refetchUser = useAuthStore((state) => state.refetchUser);
  
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [selectedTraderForCopy, setSelectedTraderForCopy] = useState<any>(null);
  const [allocationAmount, setAllocationAmount] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  // Fetch fresh user data on mount
  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  // Get copy traders from user context
  const traders = user?.copyTraders || [];
  const userActiveCopyTrading = user?.activeCopyTrading || null;

  // Calculate user stats from their active copy trading
  const userStats = {
    activeCopies: userActiveCopyTrading ? 1 : 0,
    totalProfit: userActiveCopyTrading ? userActiveCopyTrading.totalEarned : 0,
    winRate: 0, // Will be calculated based on historical data
    following: userActiveCopyTrading ? 1 : 0,
  };

  // Filter traders based on search and filter
  const filteredTraders = traders.filter(trader => {
    const matchesSearch = trader.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' ||
      trader.badge.toLowerCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Open copy modal
  const handleOpenCopyModal = (trader: any) => {
    // Check if user already has an active copy trading
    if (userActiveCopyTrading) {
      alert('You can only copy one trader at a time. Please stop your current copy trading first.');
      return;
    }
    setSelectedTraderForCopy(trader);
    setAllocationAmount('');
    setShowCopyModal(true);
  };

  // Handle stop copy trading
  const handleStopCopyTrading = async () => {
    // Prevent multiple clicks
    if (isStopping) {
      console.log('⚠️ [Frontend] Stop already in progress, ignoring click');
      return;
    }

    if (!confirm('Are you sure you want to stop copying this trader? Your allocated amount will be returned to your balance.')) {
      return;
    }

    console.log('🛑 [Frontend] Stop copy trading clicked');
    console.log('   Current balance before stop:', user?.balance);
    
    setIsStopping(true);
    
    try {
      console.log('📡 [Frontend] Sending stop request...');
      const response = await fetch('/api/copy-trading/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('📡 [Frontend] Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ [Frontend] Stop successful, data:', data);
        console.log('   Amount returned:', data.amountReturned);
        console.log('   New balance from API:', data.newBalance);
        
        // CRITICAL: Wait for data refresh BEFORE showing success and re-enabling button
        console.log('🔄 [Frontend] Refreshing user data...');
        await refetchUser();
        
        console.log('✅ [Frontend] User data refreshed');
        console.log('   New balance in state:', user?.balance);
        
        // Only show success and re-enable after data is fresh
        alert(`Copy trading stopped successfully! $${data.amountReturned.toFixed(2)} has been returned to your balance.`);
        setIsStopping(false);
      } else {
        const data = await response.json();
        console.error('❌ [Frontend] Stop failed:', data);
        alert(data.error || 'Failed to stop copy trading');
        setIsStopping(false);
      }
    } catch (error) {
      console.error('❌ [Frontend] Error stopping copy trading:', error);
      alert('Failed to stop copy trading');
      setIsStopping(false);
    }
  };

  // Handle copy trading submission
  const handleCopyTrader = async () => {
    // Prevent multiple clicks
    if (isStarting) {
      console.log('⚠️ [Frontend] Start already in progress, ignoring click');
      return;
    }

    if (!allocationAmount || parseFloat(allocationAmount) <= 0) {
      alert('Please enter a valid allocation amount');
      return;
    }

    const amount = parseFloat(allocationAmount);
    
    // Check if user has enough balance
    if (user && amount > user.balance) {
      alert(`Insufficient balance. Your balance: $${user.balance.toFixed(2)}`);
      return;
    }

    console.log('🚀 [Frontend] Start copy trading clicked');
    console.log('   Trader:', selectedTraderForCopy.name);
    console.log('   Amount:', amount);
    console.log('   Current balance:', user?.balance);

    setIsStarting(true);
    try {
      console.log('📡 [Frontend] Sending start request...');
      const response = await fetch('/api/copy-trading/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traderId: selectedTraderForCopy.id,
          allocationAmount: amount,
        }),
      });

      console.log('📡 [Frontend] Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ [Frontend] Start successful, data:', data);
        
        // CRITICAL: Close modal and wait for data refresh BEFORE showing success
        setShowCopyModal(false);
        setAllocationAmount('');
        
        console.log('🔄 [Frontend] Refreshing user data...');
        await refetchUser();
        
        console.log('✅ [Frontend] User data refreshed');
        console.log('   New balance in state:', user?.balance);
        console.log('   Active copy trading:', user?.activeCopyTrading);
        
        // Only show success and re-enable after data is fresh
        alert(`Successfully started copying ${selectedTraderForCopy.name}! $${amount.toFixed(2)} has been allocated.`);
        setIsStarting(false);
      } else {
        const data = await response.json();
        console.error('❌ [Frontend] Start failed:', data);
        alert(data.error || 'Failed to start copy trading');
        setIsStarting(false);
      }
    } catch (error) {
      console.error('❌ [Frontend] Error starting copy trading:', error);
      alert('Failed to start copy trading');
      setIsStarting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Header - Compact */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl p-6 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <span className="text-xs font-bold text-white/90">COPY TRADING</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1.5">
            Copy Expert Traders & Earn
          </h1>
          <p className="text-sm text-white/80 max-w-xl">
            Replicate proven strategies automatically
          </p>
        </div>
      </div>

      {/* Active Copy Trading - Show if user is currently copying a trader */}
      {userActiveCopyTrading && (
        <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-50 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-50 to-transparent rounded-full blur-3xl opacity-40" />
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Active Copy Trading</div>
                    <h3 className="text-2xl font-black text-slate-900">{userActiveCopyTrading.traderName}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Started {new Date(userActiveCopyTrading.startDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                  <span className="mx-2 text-slate-300">•</span>
                  <span>{Math.floor((Date.now() - new Date(userActiveCopyTrading.startDate).getTime()) / (1000 * 60 * 60 * 24))} days active</span>
                </div>
              </div>
              <button
                onClick={handleStopCopyTrading}
                disabled={isStopping}
                className="group px-6 py-3.5 bg-red-50 hover:bg-red-500 border-2 border-red-200 hover:border-red-500 text-red-600 hover:text-white rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-xl flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isStopping ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Stopping...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Stop Copying</span>
                  </>
                )}
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Allocated Amount */}
              <div className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-bold text-slate-600 uppercase tracking-wide">Allocated</div>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">${userActiveCopyTrading.allocatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>

              {/* Total Earned */}
              <div className="group bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-emerald-200 hover:border-emerald-300 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-bold text-emerald-600 uppercase tracking-wide">Earned</div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-600">+${userActiveCopyTrading.totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>

              {/* Return Percentage */}
              <div className="group bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-bold text-purple-600 uppercase tracking-wide">Return</div>
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-black text-purple-600">
                  +{((userActiveCopyTrading.totalEarned / userActiveCopyTrading.allocatedAmount) * 100).toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-blue-900 mb-1">Automatic Copy Trading Active</div>
                  <div className="text-sm text-blue-700">Your account is automatically mirroring {userActiveCopyTrading.traderName}'s trades. Profits are calculated and credited daily based on performance.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Copies */}
        <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                Active
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-2">{userStats.activeCopies}</div>
            <div className="text-sm text-slate-600 font-medium">Active Copies</div>
          </div>
        </div>

        {/* Total Profit */}
        <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                +12%
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-600 mb-2">+${userStats.totalProfit.toFixed(2)}</div>
            <div className="text-sm text-slate-600 font-medium">Total Profit</div>
          </div>
        </div>

        {/* Win Rate */}
        <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                High
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-2">{userStats.winRate}%</div>
            <div className="text-sm text-slate-600 font-medium">Win Rate</div>
          </div>
        </div>

        {/* Following */}
        <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
                Live
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-2">{userStats.following}</div>
            <div className="text-sm text-slate-600 font-medium">Following</div>
          </div>
        </div>
      </div>

      {/* Top Traders Section */}
      <div>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Top Performing Traders</h2>
            <p className="text-slate-600">Discover and copy the best traders in the market</p>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search traders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm font-semibold text-slate-700">Filter by:</span>
          {[
            { id: 'all', label: 'All Traders', icon: '🌟' },
            { id: 'elite', label: 'Elite', icon: '👑' },
            { id: 'pro', label: 'Pro', icon: '⚡' },
            { id: 'expert', label: 'Expert', icon: '🎯' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600'
              }`}
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
          
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-slate-600 font-medium">{filteredTraders.length} traders</span>
          </div>
        </div>

        {/* Empty State */}
        {filteredTraders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-300">
            <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No traders found</h3>
            <p className="text-slate-600 mb-2">
              {searchQuery || activeFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'No traders available at the moment'}
            </p>
            <p className="text-sm text-slate-500">
              Total traders in database: {traders.length}
            </p>
          </div>
        )}

        {/* Traders Grid */}
        {filteredTraders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTraders.map((trader) => (
              <TraderCard
                key={trader.id}
                trader={trader}
                isSelected={selectedTrader === trader.id}
                onSelect={() => setSelectedTrader(trader.id)}
                onCopy={() => handleOpenCopyModal(trader)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Copy Trading Modal */}
      {showCopyModal && selectedTraderForCopy && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">Start Copy Trading</h2>
                <p className="text-sm text-slate-400">Copy {selectedTraderForCopy.name}'s trades</p>
              </div>
              <button
                onClick={() => setShowCopyModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Trader Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {selectedTraderForCopy.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-white">{selectedTraderForCopy.name}</h3>
                  <span className="text-xs text-purple-400">{selectedTraderForCopy.badge}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-slate-400">ROI</div>
                  <div className="text-sm font-bold text-emerald-400">{selectedTraderForCopy.roi}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Win Rate</div>
                  <div className="text-sm font-bold text-white">{selectedTraderForCopy.winRate}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Risk</div>
                  <div className="text-sm font-bold text-amber-400">{selectedTraderForCopy.risk}</div>
                </div>
              </div>
            </div>

            {/* Balance Info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-6">
              <div className="flex items-center gap-2 text-blue-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold">Your Balance: ${user?.balance.toFixed(2) || '0.00'}</span>
              </div>
            </div>

            {/* Allocation Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-white mb-2">
                Allocation Amount
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</div>
                <input
                  type="number"
                  value={allocationAmount}
                  onChange={(e) => setAllocationAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white/10 border-2 border-white/20 focus:border-purple-500 rounded-xl px-4 pl-8 py-3 text-white placeholder-slate-500 font-bold text-lg transition-all outline-none"
                  step="0.01"
                  min="0"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                This amount will be allocated to copy {selectedTraderForCopy.name}'s trades
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCopyModal(false)}
                disabled={isStarting}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleCopyTrader}
                disabled={isStarting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isStarting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Starting...</span>
                  </>
                ) : (
                  <span>Start Copy Trading</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How It Works - Compact */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-xl font-black text-white mb-2">How It Works</h2>
            <p className="text-sm text-slate-400">Start copying in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg">
                  1
                </div>
                <h3 className="text-sm font-black text-white">Choose Trader</h3>
              </div>
              <p className="text-xs text-slate-400">Browse elite traders & review performance</p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg">
                  2
                </div>
                <h3 className="text-sm font-black text-white">Set Budget</h3>
              </div>
              <p className="text-xs text-slate-400">Allocate capital with full control</p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg">
                  3
                </div>
                <h3 className="text-sm font-black text-white">Auto-Copy</h3>
              </div>
              <p className="text-xs text-slate-400">Trades replicate automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
