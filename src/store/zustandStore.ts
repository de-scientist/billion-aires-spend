import { create } from "zustand";
import type { Product } from "@/data/products";

// Helper function to create an initial map of product IDs to quantities (all 0)
const createInitialPurchases = (products: Product[]) => {
  return products.reduce(
    (acc, product) => {
      acc[product.id] = 0;
      return acc;
    },
    {} as Record<number, number>,
  );
};

interface StoreState {
  initialBalance: number;
  currentBalance: number;
  purchases: Record<number, number>;
  products: Product[]; // Now initialized as empty []
  isDataLoaded: boolean;

  // New setter for products fetched via React Query
  setProducts: (fetchedProducts: Product[]) => void;
  buyProduct: (productId: number) => void;
  sellProduct: (productId: number) => void;
}

export const useBillionaireStore = create<StoreState>((set, get) => ({
  initialBalance: 456000000000,
  currentBalance: 456000000000,
  purchases: {}, // Initialized as empty
  products: [], // Initialized as empty
  isDataLoaded: false,

  setProducts: (fetchedProducts) => {
    // Only run initialization once
    if (get().isDataLoaded) return;

    set({
      products: fetchedProducts,
      purchases: createInitialPurchases(fetchedProducts),
      isDataLoaded: true,
    });
  },

  buyProduct: (productId) => {
    const state = get();
    const product = state.products.find((p) => p.id === productId);

    if (product && state.currentBalance >= product.price) {
      set((s) => ({
        currentBalance: s.currentBalance - product.price,
        purchases: {
          ...s.purchases,
          [productId]: (s.purchases[productId] || 0) + 1,
        },
      }));
    }
  },

  sellProduct: (productId) => {
    const state = get();
    const product = state.products.find((p) => p.id === productId);

    if (product && (state.purchases[productId] || 0) > 0) {
      set((s) => ({
        currentBalance: s.currentBalance + product.price,
        purchases: {
          ...s.purchases,
          [productId]: s.purchases[productId] - 1,
        },
      }));
    }
  },
}));
