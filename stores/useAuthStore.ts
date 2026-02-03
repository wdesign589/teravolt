import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  refetchUser: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      /**
       * Set user directly (used during login/signup)
       */
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        error: null,
      }),
      
      /**
       * Fetch complete user data from API
       * Called after login to populate full user state
       */
      fetchUser: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/user/me', {
            credentials: 'include', // Include cookies
          });
          
          if (!response.ok) {
            if (response.status === 401) {
              // Not authenticated, clear state
              set({ 
                user: null, 
                isAuthenticated: false, 
                isLoading: false,
                error: 'Not authenticated',
              });
              return;
            }
            throw new Error('Failed to fetch user data');
          }
          
          const data = await response.json();
          
          set({ 
            user: data.user, 
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Error fetching user:', error);
          set({ 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch user',
          });
        }
      },
      
      /**
       * Refetch user data after CRUD operations
       * This keeps all pages in sync with latest database state
       */
      refetchUser: async () => {
        const currentUser = get().user;
        
        console.log('🔄 [Zustand] refetchUser called');
        console.log('   Current user exists:', !!currentUser);
        console.log('   Current balance:', currentUser?.balance);
        
        // Only refetch if user is authenticated
        if (!currentUser) {
          console.log('⚠️ [Zustand] No current user, skipping refetch');
          return;
        }
        
        try {
          console.log('📡 [Zustand] Fetching /api/user/me...');
          const response = await fetch('/api/user/me', {
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error('Failed to refetch user data');
          }
          
          const data = await response.json();
          
          console.log('✅ [Zustand] User data fetched');
          console.log('   New balance:', data.user.balance);
          console.log('   Active copy trading:', data.user.activeCopyTrading);
          
          set({ 
            user: data.user,
            error: null,
          });
          
          console.log('✅ [Zustand] State updated with new user data');
        } catch (error) {
          console.error('❌ [Zustand] Error refetching user:', error);
          // Don't set error on refetch failure to avoid disrupting UI
        }
      },
      
      /**
       * Update user locally (optimistic update)
       * Should be followed by refetchUser() for confirmation
       */
      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...updates },
          });
        }
      },
      
      /**
       * Logout user and clear all state
       */
      logout: () => {
        // Clear auth cookie
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
      
      /**
       * Clear error message
       */
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      // Only persist user and isAuthenticated, not loading/error states
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
