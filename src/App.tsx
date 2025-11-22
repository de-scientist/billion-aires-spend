'use client'; 
// Removed: import { Product } from '@/data/products';
// Removed: import { fetchProducts } from '@/api/products';

import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
// NOTE: I am assuming you have renamed 'lib/zustandStore' to 'store/zustandStore'
import { useBillionaireStore } from '@/store/zustandStore'; 
// Removed: QueryClient and QueryClientProvider imports

// Removed: const queryClient = new QueryClient(); 

function HomePageContent() {
  // Products are now guaranteed to be in the store at load time (based on Zustand store setup)
  const products = useBillionaireStore((state) => state.products); 

  // --- Start of simplified rendering ---
  // Removed: useQuery, isLoading, isError checks
  
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
          {/* Note: products.map will render immediately as data is local */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Main component is now HomePageContent directly, no need for the wrapper
export default HomePageContent;