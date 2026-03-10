'use client';

import { useEffect, useRef } from 'react';
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
 * Reset the initialization flag - call this on logout
 * so the dashboard will re-initialize on next login
 */
export function resetDashboardInit() {
  globalInitStarted = false;
  console.log('🔄 [DashboardProvider] Init flag reset');
}

/**
 * DashboardProvider
 * 
 * CRITICAL: This provider NEVER blocks rendering.
 * Children are ALWAYS rendered immediately.
 * Data fetching happens in background.
 * 
 * This ensures instant navigation between dashboard pages.
 */
export default function DashboardProvider({ children }: DashboardProviderProps) {
  const initRef = useRef(false);

  /**
   * Initialize dashboard data in background
   * NEVER blocks rendering - children always render immediately
   * Empty dependency array - runs only once on mount
   */
  useEffect(() => {
    // Prevent double initialization
    if (initRef.current || globalInitStarted) {
      return;
    }
    
    initRef.current = true;
    globalInitStarted = true;
    
    const init = async () => {
      const state = useDashboardStore.getState();
      
      // If user already exists (from persistence), just refresh data
      if (state.user) {
        console.log('✅ [DashboardProvider] User exists, refreshing data in background...');
        useDashboardStore.setState({ isInitialized: true });
        
        // Background refresh - non-blocking
        Promise.all([
          state.fetchUserInvestments(),
          state.fetchInvestmentPlans(),
          state.fetchTransactions(),
          state.fetchAdminWallets(),
        ]).catch((err) => {
          console.error('⚠️ [DashboardProvider] Background refresh error:', err);
        });
        
        return;
      }
      
      // No user - need to fetch everything
      console.log('🎯 [DashboardProvider] Initializing dashboard...');
      await useDashboardStore.getState().initializeDashboard();
      
      // Check if auth failed - redirect to login using window.location (no React re-renders)
      const newState = useDashboardStore.getState();
      if (!newState.isAuthenticated || newState.errors.user === 'Not authenticated') {
        console.log('🔒 [DashboardProvider] Not authenticated, redirecting...');
        window.location.href = `/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`;
      }
    };
    
    init();
  }, []); // Empty dependency array - no re-runs

  // ALWAYS render children immediately - never block
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
