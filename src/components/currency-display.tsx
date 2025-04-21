"use client";

import { useCurrency } from "@/lib/providers/currency-provider";

import { Skeleton } from "@/components/ui/skeleton";

export function CurrencyDisplay() {
  const { currency, loading } = useCurrency();

  return loading ? (
    <Skeleton className="w-40 h-10 rounded-xs" />
  ) : (
    <div className="flex items-center gap-2">
      <span className="font-medium">Current Currency:</span>
      <span>
        {currency?.symbol} ({currency?.acronym}) - {currency?.name}
      </span>
    </div>
  );
}
