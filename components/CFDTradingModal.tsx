'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CFDTradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetType: 'gold' | 'oil';
}

export default function CFDTradingModal({ isOpen, onClose, assetType }: CFDTradingModalProps) {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro'>('basic');
  const [duration, setDuration] = useState('30');
  const [leverage, setLeverage] = useState('10');

  if (!isOpen) return null;

  const assetConfig = {
    gold: {
      title: 'Gold Trading',
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-amber-600',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-500',
      bgLight: 'bg-yellow-50',
    },
    oil: {
      title: 'Crude Oil Trading',
      color: 'blue',
      bgGradient: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-500',
      bgLight: 'bg-blue-50',
    },
  };

  const config = assetConfig[assetType];

  const tiers = {
    basic: { amount: '$10,000', value: 10000 },
    pro: { amount: '$35,000', value: 35000 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-3xl`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{config.title}</h2>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-white/80 text-sm mt-2">Select your investment tier and configure your trade</p>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Investment Tier Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Investment Amount
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedTier('basic')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedTier === 'basic'
                    ? `${config.borderColor} ${config.bgLight}`
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Basic</div>
                <div className={`text-2xl font-bold ${selectedTier === 'basic' ? config.textColor : 'text-slate-900'}`}>
                  $10,000
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTier('pro')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedTier === 'pro'
                    ? `${config.borderColor} ${config.bgLight}`
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Pro</div>
                <div className={`text-2xl font-bold ${selectedTier === 'pro' ? config.textColor : 'text-slate-900'}`}>
                  $35,000
                </div>
              </button>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all"
            >
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
              <option value="180">6 Months</option>
              <option value="365">1 Year</option>
            </select>
          </div>

          {/* Leverage */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Leverage
            </label>
            <select
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all"
            >
              <option value="5">5x</option>
              <option value="10">10x</option>
              <option value="20">20x</option>
              <option value="50">50x</option>
              <option value="100">100x</option>
            </select>
          </div>

          {/* Summary */}
          <div className={`${config.bgLight} rounded-xl p-4`}>
            <div className="text-sm font-medium text-slate-600 mb-3">Trade Summary</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Investment</span>
                <span className="font-semibold text-slate-900">{tiers[selectedTier].amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-slate-900">{duration} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Leverage</span>
                <span className="font-semibold text-slate-900">{leverage}x</span>
              </div>
              <div className="border-t border-slate-200 pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Position Size</span>
                  <span className={`font-bold ${config.textColor}`}>
                    ${(tiers[selectedTier].value * parseInt(leverage)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-xs text-red-700">
              <strong>Risk Warning:</strong> CFD trading involves significant risk. You may lose more than your initial investment. Only trade with funds you can afford to lose.
            </p>
          </div>

          {/* Submit Button */}
          <Link
            href="/sign-up"
            className={`block w-full py-4 bg-gradient-to-r ${config.bgGradient} text-white text-center font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg`}
          >
            Continue to Sign Up
          </Link>

          <p className="text-xs text-center text-slate-500">
            You'll need an account to start trading. Sign up takes less than 2 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
