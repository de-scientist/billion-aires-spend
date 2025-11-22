// src/app/page.tsx (or src/App.tsx)
'use client'; // Required for Next.js App Router for client components

import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { useBillionaireStore } from '@/lib/zustandStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query Imports

// ------------------------------------------
// Placeholder for React Query Setup (Client Side)
// Since this app doesn't fetch remote data, we'll only wrap the app.
// If it were fetching, we'd use useQuery here.
const queryClient = new QueryClient();
// ------------------------------------------

function HomePageContent() {
  const products = useBillionaireStore((state) => state.products);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Title/Branding */}
      <div className="container mx-auto max-w-6xl p-6">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-800">
                SPEND ELON'S MONEY
            </h1>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Footer/Receipt would go here */}
    </div>
  );
}

// Main component wrapped with React Query Provider
export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <HomePageContent />
        </QueryClientProvider>
    );
}