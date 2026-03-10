import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Transaction } from '@/types';

/**
 * Investment Plan from API
 */
export interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minimumAmount: number;
  maximumAmount: number;
  durationDays: number;
  percentageReturn: number;
  dailyReturn: number;
  features: string[];
  risk: 'low' | 'medium' | 'high';
  category: string;
}

/**
 * User Investment
 */
export interface UserInvestment {
  _id: string;
  investmentPlanName: string;
  amount: number;
  expectedReturn: number;
  percentageReturn?: number;
  dailyProfit?: number;
  totalProfit: number;
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  completedAt?: string;
  durationDays?: number;
  profitDistributions?: Array<{
    amount: number;
    date: string;
    balanceAfter: number;
  }>;
}

/**
 * Admin Wallet for deposits
 */
export interface AdminWallet {
  _id: string;
  cryptocurrency: string;
  network: string;
  address: string;
  isActive: boolean;
}

/**
 * Loading state for each data section
 */
interface LoadingState {
  user: boolean;
  investments: boolean;
  investmentPlans: boolean;
  transactions: boolean;
  wallets: boolean;
}

/**
 * Error state for each data section
 */
interface ErrorState {
  user: string | null;
  investments: string | null;
  investmentPlans: string | null;
  transactions: string | null;
  wallets: string | null;
}

/**
 * Dashboard Store State
 * Centralized state management for all dashboard data
 */
interface DashboardState {
  // ============ STATE ============
  // User data
  user: User | null;
  isAuthenticated: boolean;
  
  // Investment data
  userInvestments: UserInvestment[];
  investmentPlans: InvestmentPlan[];
  
  // Transaction data
  transactions: Transaction[];
  
  // Wallet data (admin wallets for deposits)
  adminWallets: AdminWallet[];
  
  // Loading states
  isLoading: LoadingState;
  isInitialized: boolean;
  isInitializing: boolean;
  
  // Error states
  errors: ErrorState;
  
  // ============ ACTIONS ============
  // Initialization
  initializeDashboard: () => Promise<void>;
  
  // User actions
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<boolean>;
  refetchUser: () => Promise<void>;
  updateUserLocally: (updates: Partial<User>) => void;
  
  // Investment actions
  fetchUserInvestments: () => Promise<void>;
  fetchInvestmentPlans: () => Promise<void>;
  
  // Transaction actions
  fetchTransactions: (filters?: { type?: string; status?: string }) => Promise<void>;
  
  // Wallet actions
  fetchAdminWallets: () => Promise<void>;
  
  // Utility actions
  logout: () => void;
  clearErrors: () => void;
  resetStore: () => void;
}

/**
 * Initial loading state
 */
const initialLoadingState: LoadingState = {
  user: false,
  investments: false,
  investmentPlans: false,
  transactions: false,
  wallets: false,
};

/**
 * Initial error state
 */
const initialErrorState: ErrorState = {
  user: null,
  investments: null,
  investmentPlans: null,
  transactions: null,
  wallets: null,
};

/**
 * Unified Dashboard Store
 * 
 * This store consolidates all dashboard data into a single source of truth.
 * Data is fetched once on dashboard initialization and only refetched when:
 * 1. User performs an action that modifies data (deposit, invest, etc.)
 * 2. User explicitly refreshes
 * 3. User logs out and back in
 */
export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // ============ INITIAL STATE ============
      user: null,
      isAuthenticated: false,
      userInvestments: [],
      investmentPlans: [],
      transactions: [],
      adminWallets: [],
      isLoading: initialLoadingState,
      isInitialized: false,
      isInitializing: false,
      errors: initialErrorState,

      // ============ INITIALIZATION ============
      /**
       * Initialize all dashboard data
       * Called once when entering the dashboard after login
       * Fetches all required data in parallel for optimal performance
       */
      initializeDashboard: async () => {
        const state = get();
        
        // Prevent multiple simultaneous initializations
        if (state.isInitializing) {
          console.log('⚠️ [DashboardStore] Already initializing, skipping...');
          return;
        }
        
        // Skip if already initialized and user exists
        if (state.isInitialized && state.user) {
          console.log('✅ [DashboardStore] Already initialized with user data');
          return;
        }
        
        console.log('🚀 [DashboardStore] Initializing dashboard...');
        set({ isInitializing: true });
        
        try {
          // First, fetch user data (required for other fetches)
          const userSuccess = await get().fetchUser();
          
          if (!userSuccess) {
            console.log('❌ [DashboardStore] User fetch failed, aborting initialization');
            set({ isInitializing: false });
            return;
          }
          
          // Fetch all other data in parallel
          console.log('📡 [DashboardStore] Fetching dashboard data in parallel...');
          await Promise.all([
            get().fetchUserInvestments(),
            get().fetchInvestmentPlans(),
            get().fetchTransactions(),
            get().fetchAdminWallets(),
          ]);
          
          console.log('✅ [DashboardStore] Dashboard initialized successfully');
          set({ 
            isInitialized: true, 
            isInitializing: false,
          });
          
        } catch (error) {
          console.error('❌ [DashboardStore] Initialization error:', error);
          set({ 
            isInitializing: false,
            errors: {
              ...get().errors,
              user: 'Failed to initialize dashboard',
            },
          });
        }
      },

      // ============ USER ACTIONS ============
      /**
       * Set user directly (used during login)
       */
      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: !!user,
          errors: { ...get().errors, user: null },
        });
      },

      /**
       * Fetch user data from API
       * Returns true if successful, false otherwise
       */
      fetchUser: async () => {
        set({ 
          isLoading: { ...get().isLoading, user: true },
          errors: { ...get().errors, user: null },
        });
        
        try {
          console.log('📡 [DashboardStore] Fetching user data...');
          const response = await fetch('/api/user/me', {
            credentials: 'include',
          });
          
          if (!response.ok) {
            if (response.status === 401) {
              console.log('🔒 [DashboardStore] Not authenticated');
              set({ 
                user: null, 
                isAuthenticated: false, 
                isLoading: { ...get().isLoading, user: false },
                errors: { ...get().errors, user: 'Not authenticated' },
              });
              return false;
            }
            throw new Error('Failed to fetch user data');
          }
          
          const data = await response.json();
          console.log('✅ [DashboardStore] User data fetched:', data.user?.email);
          
          set({ 
            user: data.user, 
            isAuthenticated: true,
            isLoading: { ...get().isLoading, user: false },
            errors: { ...get().errors, user: null },
          });
          
          return true;
          
        } catch (error) {
          console.error('❌ [DashboardStore] Error fetching user:', error);
          set({ 
            isLoading: { ...get().isLoading, user: false },
            errors: { 
              ...get().errors, 
              user: error instanceof Error ? error.message : 'Failed to fetch user',
            },
          });
          return false;
        }
      },

      /**
       * Refetch user data after mutations
       * Use this after deposit, withdraw, invest, etc.
       */
      refetchUser: async () => {
        const currentUser = get().user;
        
        if (!currentUser) {
          console.log('⚠️ [DashboardStore] No current user, skipping refetch');
          return;
        }
        
        console.log('🔄 [DashboardStore] Refetching user data...');
        
        try {
          const response = await fetch('/api/user/me', {
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error('Failed to refetch user data');
          }
          
          const data = await response.json();
          console.log('✅ [DashboardStore] User data refetched');
          
          set({ 
            user: data.user,
            errors: { ...get().errors, user: null },
          });
          
        } catch (error) {
          console.error('❌ [DashboardStore] Error refetching user:', error);
          // Don't set error on refetch failure to avoid disrupting UI
        }
      },

      /**
       * Update user locally (optimistic update)
       */
      updateUserLocally: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...updates },
          });
        }
      },

      // ============ INVESTMENT ACTIONS ============
      /**
       * Fetch user's active investments
       */
      fetchUserInvestments: async () => {
        set({ 
          isLoading: { ...get().isLoading, investments: true },
          errors: { ...get().errors, investments: null },
        });
        
        try {
          console.log('📡 [DashboardStore] Fetching user investments...');
          const response = await fetch('/api/user/investments', {
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch investments');
          }
          
          const data = await response.json();
          console.log('✅ [DashboardStore] Investments fetched:', data.investments?.length || 0);
          
          set({ 
            userInvestments: data.investments || [],
            isLoading: { ...get().isLoading, investments: false },
          });
          
        } catch (error) {
          console.error('❌ [DashboardStore] Error fetching investments:', error);
          set({ 
            isLoading: { ...get().isLoading, investments: false },
            errors: { 
              ...get().errors, 
              investments: error instanceof Error ? error.message : 'Failed to fetch investments',
            },
          });
        }
      },

      /**
       * Fetch available investment plans
       */
      fetchInvestmentPlans: async () => {
        set({ 
          isLoading: { ...get().isLoading, investmentPlans: true },
          errors: { ...get().errors, investmentPlans: null },
        });
        
        try {
          console.log('📡 [DashboardStore] Fetching investment plans...');
          const response = await fetch('/api/investments', {
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch investment plans');
          }
          
          const data = await response.json();
          console.log('✅ [DashboardStore] Investment plans fetched:', data.investments?.length || 0);
          
          set({ 
            investmentPlans: data.investments || [],
            isLoading: { ...get().isLoading, investmentPlans: false },
          });
          
        } catch (error) {
          console.error('❌ [DashboardStore] Error fetching investment plans:', error);
          set({ 
            isLoading: { ...get().isLoading, investmentPlans: false },
            errors: { 
              ...get().errors, 
              investmentPlans: error instanceof Error ? error.message : 'Failed to fetch investment plans',
            },
          });
        }
      },

      // ============ TRANSACTION ACTIONS ============
      /**
       * Fetch user transactions with optional filters
       */
      fetchTransactions: async (filters) => {
        set({ 
          isLoading: { ...get().isLoading, transactions: true },
          errors: { ...get().errors, transactions: null },
        });
        
        try {
          console.log('📡 [DashboardStore] Fetching transactions...');
          
          const params = new URLSearchParams();
          if (filters?.type && filters.type !== 'all') {
            params.append('type', filters.type);
          }
          if (filters?.status && filters.status !== 'all') {
            params.append('status', filters.status);
          }
          
          const url = `/api/transactions${params.toString() ? `?${params.toString()}` : ''}`;
          const response = await fetch(url, {
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch transactions');
          }
          
          const data = await response.json();
          console.log('✅ [DashboardStore] Transactions fetched:', data.transactions?.length || 0);
          
          set({ 
            transactions: data.transactions || [],
            isLoading: { ...get().isLoading, transactions: false },
          });
          
        } catch (error) {
          console.error('❌ [DashboardStore] Error fetching transactions:', error);
          set({ 
            isLoading: { ...get().isLoading, transactions: false },
            errors: { 
              ...get().errors, 
              transactions: error instanceof Error ? error.message : 'Failed to fetch transactions',
            },
          });
        }
      },

      // ============ WALLET ACTIONS ============
      /**
       * Fetch admin wallets for deposits
       */
      fetchAdminWallets: async () => {
        set({ 
          isLoading: { ...get().isLoading, wallets: true },
          errors: { ...get().errors, wallets: null },
        });
        
        try {
          console.log('📡 [DashboardStore] Fetching admin wallets...');
          const response = await fetch('/api/wallets', {
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch wallets');
          }
          
          const data = await response.json();
          console.log('✅ [DashboardStore] Admin wallets fetched:', data.wallets?.length || 0);
          
          set({ 
            adminWallets: data.wallets || [],
            isLoading: { ...get().isLoading, wallets: false },
          });
          
        } catch (error) {
          console.error('❌ [DashboardStore] Error fetching wallets:', error);
          set({ 
            isLoading: { ...get().isLoading, wallets: false },
            errors: { 
              ...get().errors, 
              wallets: error instanceof Error ? error.message : 'Failed to fetch wallets',
            },
          });
        }
      },

      // ============ UTILITY ACTIONS ============
      /**
       * Logout user and clear all dashboard state
       */
      logout: () => {
        // Clear auth cookie
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        // Clear persisted Zustand state from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('dashboard-storage');
        }
        
        // Reset all state
        set({ 
          user: null, 
          isAuthenticated: false,
          userInvestments: [],
          investmentPlans: [],
          transactions: [],
          adminWallets: [],
          isLoading: initialLoadingState,
          isInitialized: false,
          isInitializing: false,
          errors: initialErrorState,
        });
        
        console.log('🚪 [DashboardStore] User logged out, state and localStorage cleared');
      },

      /**
       * Clear all error messages
       */
      clearErrors: () => {
        set({ errors: initialErrorState });
      },

      /**
       * Reset store to initial state (useful for testing)
       */
      resetStore: () => {
        set({
          user: null,
          isAuthenticated: false,
          userInvestments: [],
          investmentPlans: [],
          transactions: [],
          adminWallets: [],
          isLoading: initialLoadingState,
          isInitialized: false,
          isInitializing: false,
          errors: initialErrorState,
        });
      },
    }),
    {
      name: 'dashboard-storage',
      // Only persist essential data, not loading/error states
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        // Don't persist other data - always fetch fresh on dashboard load
      }),
    }
  )
);

/**
 * Selector hooks for optimized re-renders
 * Use these instead of accessing the full store when possible
 */
export const useUser = () => useDashboardStore((state) => state.user);
export const useIsAuthenticated = () => useDashboardStore((state) => state.isAuthenticated);
export const useUserInvestments = () => useDashboardStore((state) => state.userInvestments);
export const useInvestmentPlans = () => useDashboardStore((state) => state.investmentPlans);
export const useTransactions = () => useDashboardStore((state) => state.transactions);
export const useAdminWallets = () => useDashboardStore((state) => state.adminWallets);
export const useIsInitialized = () => useDashboardStore((state) => state.isInitialized);
export const useIsLoading = () => useDashboardStore((state) => state.isLoading);
export const useErrors = () => useDashboardStore((state) => state.errors);
