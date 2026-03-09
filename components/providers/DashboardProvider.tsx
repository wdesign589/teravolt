'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDashboardStore } from '@/stores/useDashboardStore';

interface DashboardProviderProps {
  children: React.ReactNode;
}

/**
 * DashboardProvider
 * 
 * This provider wraps the entire dashboard layout and handles:
 * 1. Initial data loading when entering the dashboard
 * 2. Authentication verification
 * 3. Redirect to login if not authenticated
 * 4. Loading state management
 * 
 * Data is fetched ONCE when the provider mounts, and only refetched when:
 * - User performs a mutation (deposit, invest, etc.)
 * - User explicitly refreshes
 * - User logs out and back in
 * 
 * IMPORTANT: This provider NEVER blocks rendering after initial load.
 * Navigation between dashboard pages should be instant.
 */
export default function DashboardProvider({ children }: DashboardProviderProps) {
  const router = useRouter();
  
  // Local state to track if we've attempted initialization
  // This persists across route changes within the dashboard
  const [hasAttemptedInit, setHasAttemptedInit] = useState(false);
  
  // Get store state - these are reactive and will update the component
  const isInitialized = useDashboardStore((state) => state.isInitialized);
  const isInitializing = useDashboardStore((state) => state.isInitializing);
  const user = useDashboardStore((state) => state.user);
  const errors = useDashboardStore((state) => state.errors);

  /**
   * Initialize dashboard data on mount
   * This runs ONCE when entering the dashboard
   */
  useEffect(() => {
    // Only run initialization once
    if (hasAttemptedInit) {
      return;
    }
    
    const init = async () => {
      // Check store state directly
      const currentState = useDashboardStore.getState();
      
      // Skip if already initialized with user data
      if (currentState.isInitialized && currentState.user) {
        console.log('✅ [DashboardProvider] Already initialized, skipping fetch');
        setHasAttemptedInit(true);
        return;
      }
      
      // Skip if currently initializing
      if (currentState.isInitializing) {
        console.log('⏳ [DashboardProvider] Already initializing, skipping');
        return;
      }
      
      console.log('🎯 [DashboardProvider] Starting initialization...');
      setHasAttemptedInit(true);
      
      await useDashboardStore.getState().initializeDashboard();
      
      // Check if initialization failed due to auth
      const state = useDashboardStore.getState();
      if (!state.isAuthenticated && state.errors.user === 'Not authenticated') {
        console.log('🔒 [DashboardProvider] Not authenticated, redirecting to login...');
        const currentPath = window.location.pathname;
        router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
      }
    };
    
    init();
  }, [hasAttemptedInit, router]);

  /**
   * Handle authentication errors - redirect to login
   */
  useEffect(() => {
    if (errors.user === 'Not authenticated' && !isInitializing && hasAttemptedInit) {
      console.log('🔒 [DashboardProvider] Auth error detected, redirecting...');
      const currentPath = window.location.pathname;
      router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [errors.user, isInitializing, hasAttemptedInit, router]);

  /**
   * Show loading state ONLY on first initialization
   * Once initialized, ALWAYS render children immediately
   * This ensures navigation between pages is instant
   */
  if (!isInitialized && !hasAttemptedInit) {
    // Very first render before init starts
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Loading Dashboard</h2>
          <p className="text-slate-600 text-sm">Preparing your investment data...</p>
        </div>
      </div>
    );
  }

  if (isInitializing && !isInitialized) {
    // Currently initializing for the first time
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Loading Dashboard</h2>
          <p className="text-slate-600 text-sm">Preparing your investment data...</p>
        </div>
      </div>
    );
  }

  /**
   * Show error state if initialization failed (non-auth error)
   */
  if (errors.user && errors.user !== 'Not authenticated' && !isInitialized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-600 text-sm mb-6">{errors.user}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                useDashboardStore.getState().clearErrors();
                useDashboardStore.getState().resetStore();
                setHasAttemptedInit(false);
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/sign-in')}
              className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * ALWAYS render children once we've attempted initialization
   * This ensures navigation is never blocked
   */
  return <>{children}</>;
}

/**
 * Hook to trigger data refetch after mutations
 * Use this in components that modify data (deposit, invest, etc.)
 */
export function useRefreshDashboardData() {
  const refetchUser = useDashboardStore((state) => state.refetchUser);
  const fetchUserInvestments = useDashboardStore((state) => state.fetchUserInvestments);
  const fetchTransactions = useDashboardStore((state) => state.fetchTransactions);
  
  /**
   * Refresh all dashboard data
   * Call this after any mutation that affects user data
   */
  const refreshAll = async () => {
    console.log('🔄 [DashboardProvider] Refreshing all dashboard data...');
    await Promise.all([
      refetchUser(),
      fetchUserInvestments(),
      fetchTransactions(),
    ]);
    console.log('✅ [DashboardProvider] Dashboard data refreshed');
  };
  
  /**
   * Refresh only user data
   * Call this after mutations that only affect user balance/profile
   */
  const refreshUser = async () => {
    await refetchUser();
  };
  
  /**
   * Refresh user and investments
   * Call this after creating/modifying investments
   */
  const refreshInvestments = async () => {
    await Promise.all([
      refetchUser(),
      fetchUserInvestments(),
    ]);
  };
  
  /**
   * Refresh user and transactions
   * Call this after deposits/withdrawals
   */
  const refreshTransactions = async () => {
    await Promise.all([
      refetchUser(),
      fetchTransactions(),
    ]);
  };
  
  return {
    refreshAll,
    refreshUser,
    refreshInvestments,
    refreshTransactions,
  };
}
