"use client";

import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useBillionaireStore } from "@/store/zustandStore";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchProducts } from "@/api/products"; // Import the mock API
import Product from "@/data/products";

// Setup the QueryClient (can be in a separate provider file for real apps)
const queryClient = new QueryClient();

function HomePageContent() {
  const setProducts = useBillionaireStore((state) => state.setProducts);
  const products = useBillionaireStore((state) => state.products);

  // 1. Use useQuery to fetch data
  const { data, isLoading, isError, error } = useQuery<
    Product[],
    Error,
    Product[],
    string[]
  >({
    queryKey: ["products"],
    queryFn: fetchProducts,
    // Keep the data fresh for a few minutes
    staleTime: 1000 * 60 * 5,
    // Automatically call setProducts when the data is successfully fetched
    onSuccess: (data) => {
      setProducts(data);
    },
  });

  // 2. Handle Loading State
  if (isLoading || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold">
          Loading products... (Simulating API call)
        </div>
      </div>
    );
  }

  // 3. Handle Error State
  if (isError) {
    console.error("React Query Error:", error);
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-red-50 text-red-700">
        <div className="text-xl font-bold">Error loading data.</div>
        <p>Please check the mock API implementation.</p>
      </div>
    );
  }

  // 4. Render Content
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto max-w-6xl p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-800">
            SPEND ELON'S MONEY
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
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
