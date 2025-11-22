// src/components/Header.tsx
import { useBillionaireStore } from '@/lib/zustandStore';
import { cn } from '@/lib/utils'; // utility from shadcn/ui

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export function Header() {
  const currentBalance = useBillionaireStore((state) => state.currentBalance);
  const initialBalance = useBillionaireStore((state) => state.initialBalance);

  // Determine color based on spending (Red if spent, Green if full)
  const isSpent = currentBalance < initialBalance;

  return (
    <div className={cn(
        "sticky top-0 z-10 w-full p-4 text-center font-bold text-white",
        isSpent ? "bg-red-600/90" : "bg-green-600/90"
    )}>
      Current balance: {formatCurrency(currentBalance)}
    </div>
  );
}