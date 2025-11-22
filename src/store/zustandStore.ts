// src/lib/zustandStore.ts
import { create } from 'zustand';
import { initialProducts, Product } from '@/data/products';

// Helper function to create an initial map of product IDs to quantities (all 0)
const initialPurchases = initialProducts.reduce((acc, product) => {
  acc[product.id] = 0;
  return acc;
}, {} as Record<number, number>);

interface StoreState {
  initialBalance: number;
  currentBalance: number;
  purchases: Record<number, number>; // productId -> quantity
  products: Product[];
  
  buyProduct: (productId: number) => void;
  sellProduct: (productId: number) => void;
}

export const useBillionaireStore = create<StoreState>((set, get) => ({
  initialBalance: 456000000000, // Based on the image
  currentBalance: 456000000000,
  purchases: initialPurchases,
  products: initialProducts,

  buyProduct: (productId) => {
    const state = get();
    const product = state.products.find(p => p.id === productId);

    if (product && state.currentBalance >= product.price) {
      set(s => ({
        currentBalance: s.currentBalance - product.price,
        purchases: {
          ...s.purchases,
          [productId]: s.purchases[productId] + 1,
        },
      }));
    }
  },

  sellProduct: (productId) => {
    const state = get();
    const product = state.products.find(p => p.id === productId);

    if (product && state.purchases[productId] > 0) {
      set(s => ({
        currentBalance: s.currentBalance + product.price,
        purchases: {
          ...s.purchases,
          [productId]: s.purchases[productId] - 1,
        },
      }));
    }
  },
}));