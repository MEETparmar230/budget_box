'use client'
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';

type Budget = {
  income: number;
  bills: number;
  food: number;
  transport: number;
  subscriptions: number;
  misc: number;
  updatedAt: string;
  monthYear: string;
};

type State = {
  budget: Budget | null;
  setBudget: (partial: Partial<Budget>) => void;
  replaceBudget: (b: Budget) => void;
};

export const useBudgetStore = create<State>()(
  persist(
    (set, get) => ({
      budget: null,

      setBudget: (partial) => {
        const cur = get().budget ?? {
          income: 0,
          bills: 0,
          food: 0,
          transport: 0,
          subscriptions: 0,
          misc: 0,
          updatedAt: new Date().toISOString(),
          monthYear: new Date().toISOString().slice(0, 7),
        };

        const next = {
          ...cur,
          ...partial,
          updatedAt: new Date().toISOString(),
        };

        set({ budget: next });
      },

      replaceBudget: (b) => set({ budget: b }),
    }),

    {
      name: "budgetbox-storage",

      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          const value = await localforage.getItem<string | null>(name);
          return value ?? null;
        },
        setItem: async (name, value) => {
          await localforage.setItem(name, value);
          return value;
        },
        removeItem: async (name) => {
          await localforage.removeItem(name);
          return ""; 
        },
      })),
    }
  )
);
