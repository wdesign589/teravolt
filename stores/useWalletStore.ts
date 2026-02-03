import { create } from 'zustand';
import type { Wallet } from '@/types';

interface WalletState {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  setWallets: (wallets: Wallet[]) => void;
  setSelectedWallet: (wallet: Wallet | null) => void;
  updateBalance: (cryptocurrency: string, newBalance: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallets: [],
  selectedWallet: null,
  setWallets: (wallets) => set({ wallets }),
  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
  updateBalance: (cryptocurrency, newBalance) =>
    set((state) => ({
      wallets: state.wallets.map((wallet) =>
        wallet.cryptocurrency === cryptocurrency
          ? { ...wallet, balance: newBalance }
          : wallet
      ),
    })),
}));
