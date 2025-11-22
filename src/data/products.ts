// src/data/products.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Rolex',
    price: 15000,
    image: '/images/rolex.jpg', 
  },
  {
    id: 2,
    name: 'Ford F 150',
    price: 30000,
    image: '/images/ford_f150.jpg',
  },
  {
    id: 3,
    name: 'Tesla',
    price: 75000,
    image: '/images/tesla.jpg',
  },
  
];