// src/api/products.ts
import { initialProducts } from '@/data/products';
import type { Product } from '@/data/products';

// Simulate network latency
const DELAY = 500; 

/**
 * @description Simulates fetching the list of products from a remote API.
 */
export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would be `axios.get('/api/products')`
      resolve(initialProducts);
    }, DELAY);
  });
};