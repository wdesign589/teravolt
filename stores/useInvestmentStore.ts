import { create } from 'zustand';
import type { Investment } from '@/types';

interface InvestmentState {
  investments: Investment[];
  setInvestments: (investments: Investment[]) => void;
  addInvestment: (investment: Investment) => void;
  updateInvestment: (id: string, updates: Partial<Investment>) => void;
}

export const useInvestmentStore = create<InvestmentState>((set) => ({
  investments: [],
  setInvestments: (investments) => set({ investments }),
  addInvestment: (investment) =>
    set((state) => ({ investments: [...state.investments, investment] })),
  updateInvestment: (id, updates) =>
    set((state) => ({
      investments: state.investments.map((inv) =>
        inv.id === id ? { ...inv, ...updates } : inv
      ),
    })),
}));
