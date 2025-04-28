"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useCurrency } from "@/lib/providers/currency";

import { Tables } from "@/types/supabase";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function CurrencySelect({
  triggerClassName,
  contentClassName,
  allowAllCurrencies = false,
  onCurrencyChange,
}: {
  triggerClassName?: string;
  contentClassName?: string;
  allowAllCurrencies?: boolean;
  onCurrencyChange?: (currency: Tables<"currencies"> | null) => void;
}) {
  const { currency, currencies, setCurrency, loading } = useCurrency();
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (currency) {
      setSelectedValue(currency.id.toString());
    } else if (allowAllCurrencies) {
      setSelectedValue("all_currencies");
    }
  }, [currency, allowAllCurrencies]);

  const handleCurrencyChange = (value: string) => {
    setSelectedValue(value);

    if (value === "all_currencies") {
      if (allowAllCurrencies && onCurrencyChange) {
        onCurrencyChange(null);
      }
    } else {
      const selectedCurrency = currencies.find(
        (c) => c.id.toString() === value
      );

      if (selectedCurrency) {
        if (!allowAllCurrencies) {
          setCurrency(selectedCurrency);
        }

        if (onCurrencyChange) {
          onCurrencyChange(selectedCurrency);
        }
      }
    }
  };

  const selectedCurrency =
    selectedValue === "all_currencies"
      ? null
      : currencies.find((c) => c.id.toString() === selectedValue);

  return loading ? (
    <Skeleton className="w-40 h-10 rounded-xs"></Skeleton>
  ) : (
    <Select value={selectedValue} onValueChange={handleCurrencyChange}>
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder="Select a currency">
          {selectedValue === "all_currencies" ? (
            "All Currencies"
          ) : selectedCurrency ? (
            <div className="flex items-center gap-2">
              <Image
                src={`/images/currencies/${selectedCurrency.acronym.toLowerCase()}.webp`}
                alt={selectedCurrency.name}
                width={25}
                height={20}
                className="rounded-xs"
              />
              {selectedCurrency.name}
            </div>
          ) : null}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className={contentClassName}>
        {allowAllCurrencies && (
          <SelectItem value="all_currencies">All Currencies</SelectItem>
        )}
        {currencies.map((curr) => (
          <SelectItem key={curr.id} value={curr.id.toString()}>
            <div className="flex items-center gap-2">
              <Image
                src={`/images/currencies/${curr.acronym.toLowerCase()}.webp`}
                alt={curr.name}
                width={25}
                height={20}
                className="rounded-xs"
              />
              {curr.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
