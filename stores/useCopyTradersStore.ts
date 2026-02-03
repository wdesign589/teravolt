import { create } from 'zustand';

export interface CopyTrader {
  id: string;
  name: string;
  avatar: string;
  roi: string;
  followers: string;
  winRate: string;
  trades: number;
  badge: string;
  risk: 'Low' | 'Medium' | 'High';
  avgProfit: string;
  totalReturn: string;
  monthlyReturn: string;
}

export interface UserActiveCopyTrading {
  traderId: string;
  traderName: string;
  allocatedAmount: number;
  totalEarned: number;
  startDate: Date;
}

interface CopyTradersState {
  // State
  traders: CopyTrader[];
  userActiveCopyTrading: UserActiveCopyTrading | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCopyTraders: () => Promise<void>;
  clearError: () => void;
}

export const useCopyTradersStore = create<CopyTradersState>()((set) => ({
  // Initial state
  traders: [],
  userActiveCopyTrading: null,
  isLoading: false,
  error: null,
  
  /**
   * Fetch all active copy traders and user's active copy trading
   */
  fetchCopyTraders: async () => {
    console.log('🔄 [Store] Starting to fetch copy traders...');
    set({ isLoading: true, error: null });
    
    try {
      console.log('📡 [Store] Making API request to /api/copy-traders');
      const response = await fetch('/api/copy-traders', {
        credentials: 'include', // Include cookies for authentication
      });
      
      console.log('📥 [Store] Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log('🔒 [Store] Not authenticated');
          // Not authenticated
          set({ 
            traders: [],
            userActiveCopyTrading: null,
            isLoading: false,
            error: 'Not authenticated',
          });
          return;
        }
        const errorData = await response.json();
        console.error('❌ [Store] API error:', errorData);
        throw new Error(errorData.error || 'Failed to fetch copy traders');
      }
      
      const data = await response.json();
      console.log('✅ [Store] API response:', data);
      console.log('📊 [Store] Traders count:', data.traders?.length || 0);
      
      set({ 
        traders: data.traders || [],
        userActiveCopyTrading: data.userActiveCopyTrading,
        isLoading: false,
        error: null,
      });
      
      console.log('💾 [Store] State updated successfully');
    } catch (error) {
      console.error('❌ [Store] Error fetching copy traders:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch copy traders',
      });
    }
  },
  
  /**
   * Clear error message
   */
  clearError: () => set({ error: null }),
}));
