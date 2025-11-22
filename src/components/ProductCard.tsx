import { Product } from "@/data/products";
import { useBillionaireStore } from "@/store/zustandStore";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // shadcn/ui card
import { useShallow } from 'zustand/react/shallow'; // <-- IMPORTED useShallow

// Utility for currency formatting (can be imported from Header)
const formatCurrency = (amount: number) => {
  // Ensure no fractional digits for large currency values like Elon's
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // FIX: Wrapped the selector function with useShallow to prevent infinite re-renders.
  const { currentBalance, purchases, buyProduct, sellProduct } =
    useBillionaireStore(
      useShallow((state) => ({
        currentBalance: state.currentBalance,
        purchases: state.purchases,
        buyProduct: state.buyProduct,
        sellProduct: state.sellProduct,
      }))
    );

  // The quantity selection is now safe as 'purchases' reference is stable
  const quantity = purchases[product.id] || 0;
  const canBuy = currentBalance >= product.price;
  const canSell = quantity > 0;

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {/* Replace with actual image component/tag */}
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            {/*  - Placeholder for Image display */}
            <p className="text-sm text-gray-500">Image of {product.name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
        <p className="text-lg font-bold text-green-600">
          {formatCurrency(product.price)}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 p-4 pt-0">
        <Button
          variant="outline"
          onClick={() => sellProduct(product.id)}
          disabled={!canSell}
          className="w-full bg-red-100 hover:bg-red-200"
        >
          Sell
        </Button>

        {/* Simple Input/Display for Quantity */}
        <div className="flex h-10 w-16 items-center justify-center rounded-md border border-input text-center text-lg font-mono">
          {quantity}
        </div>

        <Button
          onClick={() => buyProduct(product.id)}
          disabled={!canBuy}
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}