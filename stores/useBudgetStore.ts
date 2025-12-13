'use client'
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { isOnline, onOnline } from '@/lib/offline';
import { Budget } from '@/lib/types';
import budgetDB from '@/lib/localDB';


type SyncStatus = 'local' | 'pending' | 'synced';


type State = {
  budget: Budget | null;
  setBudget: (partial: Partial<Budget>) => void;
  replaceBudget: (b: Budget) => void;
  syncStatus: SyncStatus;
  markPending: () => void;
  setSynced: () => void;
  tryAutoSync: () => Promise<void>;
};


export const useBudgetStore = create<State>()(
  persist(
    (set, get) => ({
      budget: null,
      syncStatus: 'local',
      setBudget: (partial) => {
        const cur: Budget = get().budget ?? {
          income: 0, bills: 0, food: 0, transport: 0, subscriptions: 0, miscellaneous: 0,
          updatedAt: new Date().toISOString(),
          monthYear: new Date().toISOString().slice(0, 7),
        };
        const next: Budget = { ...cur, ...partial, updatedAt: new Date().toISOString() } as Budget;
        set({ budget: next, syncStatus: isOnline() ? 'local' : 'pending' });
        // If offline, we mark pending; if online we still consider local until user syncs
      },
      replaceBudget: (b) => set({ budget: b }),
      markPending: () => set({ syncStatus: 'pending' }),
      setSynced: () => set({ syncStatus: 'synced' }),
      tryAutoSync: async () => {
        const s = get();
        const b = s.budget;
        if (!b) return;
        if (!isOnline()) {
          set({ syncStatus: 'pending' });
          return;
        }
        try {
          const res = await fetch('/api/budget/sync', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ monthYear: b.monthYear, data: b }),
          });
          if (res.ok) {
            set({ syncStatus: 'synced' });
          } else {
            set({ syncStatus: 'pending' });
          }
        } catch (e) {
          set({ syncStatus: 'pending' });
        }
      }
    }),
    {
      name: 'budgetbox-storage',
      storage: createJSONStorage(() => budgetDB),

    }
  )
);


// Optional: auto-try sync when network returns
if (typeof window !== 'undefined') {
  onOnline(() => {
    const s = useBudgetStore.getState();
    s.tryAutoSync().catch(() => { });
  });
}