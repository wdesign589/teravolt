'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDashboardStore } from '@/stores/useDashboardStore';

interface DashboardProviderProps {
  children: React.ReactNode;
}

/**
 * Module-level flag to track initialization across component remounts
 * This persists even when the component remounts during navigation
 */
let globalInitStarted = false;

/**
 * DashboardProvider
 * 
 * Key architectural decisions:
 * 1. Use module-level flag (not useState) to track init - survives remounts
 * 2. Wait for Zustand hydration before showing loading screen
 * 3. Check for persisted `user` to determine if we should show loading
 * 4. Never block rendering if user data exists (from localStorage)
 * 5. Background refresh data without blocking UI
 */
export default function DashboardProvider({ children }: DashboardProviderProps) {
  const router = useRouter();
  const initRef = useRef(false);
  
  // Track if Zustand has hydrated from localStorage
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Get persisted user directly - this is restored from localStorage after hydration
  const user = useDashboardStore((state) => state.user);
  const errors = useDashboardStore((state) => state.errors);

  /**
   * Wait for Zustand hydration to complete
   * This prevents flash of loading screen before localStorage is read
   */
  useEffect(() => {
    // Check if already hydrated (user exists)
    const state = useDashboardStore.getState();
    if (state.user) {
      setIsHydrated(true);
      return;
    }
    
    // Subscribe to store changes to detect hydration
    const unsubscribe = useDashboardStore.subscribe((state) => {
      if (state.user) {
        setIsHydrated(true);
      }
    });
    
    // Also set hydrated after a short delay to handle case where there's no persisted data
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 100);
    
    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  /**
   * Initialize dashboard data
   * Runs once per session, not per navigation
   */
  useEffect(() => {
    // Wait for hydration before initializing
    if (!isHydrated) {
      return;
    }
    
    // Use both ref and global flag to prevent double initialization
    if (initRef.current || globalInitStarted) {
      return;
    }
    
    const init = async () => {
      const state = useDashboardStore.getState();
      
      // If user exists from persistence, just refresh data in background
      // Don't block the UI - user can see dashboard immediately
      if (state.user) {
        console.log('✅ [DashboardProvider] User exists from persistence, refreshing data in background...');
        initRef.current = true;
        globalInitStarted = true;
        
        // Mark as initialized immediately so UI renders
        useDashboardStore.setState({ isInitialized: true });
        
        // Refresh data in background (non-blocking)
        Promise.all([
          state.fetchUserInvestments(),
          state.fetchInvestmentPlans(),
          state.fetchTransactions(),
          state.fetchAdminWallets(),
        ]).then(() => {
          console.log('✅ [DashboardProvider] Background data refresh complete');
        }).catch((err) => {
          console.error('⚠️ [DashboardProvider] Background refresh error:', err);
        });
        
        return;
      }
      
      // No user in persistence - need to fetch everything
      console.log('🎯 [DashboardProvider] No cached user, initializing from scratch...');
      initRef.current = true;
      globalInitStarted = true;
      
      await useDashboardStore.getState().initializeDashboard();
      
      // Check if auth failed
      const newState = useDashboardStore.getState();
      if (!newState.isAuthenticated || newState.errors.user === 'Not authenticated') {
        console.log('🔒 [DashboardProvider] Not authenticated, redirecting...');
        const currentPath = window.location.pathname;
        router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
      }
    };
    
    init();
  }, [isHydrated, router]);

  /**
   * Handle auth errors - redirect to login
   */
  useEffect(() => {
    if (errors.user === 'Not authenticated') {
      const currentPath = window.location.pathname;
      router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [errors.user, router]);

  /**
   * Show loading only if:
   * 1. Hydration is complete (we've read localStorage)
   * 2. AND there's no user (not logged in or first visit)
   * 3. AND there's no error
   * 
   * This prevents flash of loading screen during hydration
   */
  if (!isHydrated) {
    // Still hydrating - render nothing to prevent flash
    // This is a very brief moment (< 100ms)
    return null;
  }

  if (!user && !errors.user) {
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
   * Show error state for non-auth errors
   */
  if (errors.user && errors.user !== 'Not authenticated') {
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
                globalInitStarted = false;
                initRef.current = false;
                useDashboardStore.getState().clearErrors();
                useDashboardStore.getState().initializeDashboard();
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

  // User exists - render dashboard immediately
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
