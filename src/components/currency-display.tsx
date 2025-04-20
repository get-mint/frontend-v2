"use client";

import { useCurrency } from "@/lib/providers/currency-provider";

export function CurrencyDisplay() {
  const { currency, loading } = useCurrency();

  if (loading) {
    return <div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Current Currency:</span>
      <span>
        {currency?.symbol} ({currency?.acronym}) - {currency?.name}
      </span>
    </div>
  );
} 