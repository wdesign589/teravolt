'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

interface TraderCardProps {
  trader: {
    id: string;
    name: string;
    avatar: string;
    roi: string;
    followers: string;
    winRate: string;
    trades: number;
    badge: string;
    risk: string;
    avgProfit: string;
    totalReturn: string;
    monthlyReturn: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onCopy: () => void;
}

export default function TraderCard({ trader, isSelected, onSelect, onCopy }: TraderCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate random chart data
  const chartData = useMemo(() => {
    return Array.from({ length: 20 }, () => Math.random() * 100);
  }, [trader.id]);

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case 'Elite':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50';
      case 'Pro':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50';
      case 'Expert':
        return 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/50';
      default:
        return 'bg-slate-200 text-slate-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-emerald-600 bg-emerald-50';
      case 'Medium':
        return 'text-amber-600 bg-amber-50';
      case 'High':
        return 'text-rose-600 bg-rose-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div
      className={`relative group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer ${
        isSelected
          ? 'ring-4 ring-purple-500 shadow-2xl shadow-purple-500/50 scale-[1.02]'
          : 'hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.01] border-2 border-slate-700'
      }`}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Avatar with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-xl ring-2 ring-purple-500/50">
                {trader.avatar ? (
                  <Image
                    src={trader.avatar}
                    alt={trader.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {trader.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-0.5">{trader.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-semibold text-purple-400">{trader.followers}</span>
              </div>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-black ${getBadgeStyles(trader.badge)}`}>
            {trader.badge}
          </span>
        </div>

        {/* Mini Performance Chart */}
        <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-purple-500/20 overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-xs text-purple-300 font-semibold mb-1">Total ROI</div>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {trader.roi}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                {trader.monthlyReturn} monthly
              </div>
            </div>
            <div className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-lg">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-bold text-emerald-400">Active</span>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="relative h-16 flex items-end gap-0.5">
            {chartData.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-purple-500 via-pink-500 to-blue-500 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        </div>

        {/* Performance Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium mb-1">Win Rate</div>
            <div className="text-lg font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{trader.winRate}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium mb-1">Trades</div>
            <div className="text-lg font-black text-white">{trader.trades}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium mb-1">Avg Profit</div>
            <div className="text-lg font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{trader.avgProfit}</div>
          </div>
        </div>

        {/* Risk & Return */}
        <div className="flex items-center justify-between mb-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm font-medium text-slate-300">Risk Level</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(trader.risk)}`}>
            {trader.risk}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={onCopy}
            className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white py-3 rounded-xl font-black text-sm transition-all duration-300 shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/60 flex items-center justify-center gap-2 group">
            <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            Copy Trader
          </button>
          <button className="px-4 py-3 border-2 border-white/10 hover:border-purple-500 hover:bg-purple-500/20 rounded-xl transition-all duration-300 group backdrop-blur-sm">
            <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-5 right-5 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
}
