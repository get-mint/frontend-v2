"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export function CurrencySelect({
  currency,
  setCurrency,
  triggerClassName,
  contentClassName,
}: {
  currency: Tables<"currencies"> | null;
  setCurrency: (currency: Tables<"currencies"> | null) => void;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  const [currencies, setCurrencies] = useState<Tables<"currencies">[]>([]);

  async function fetchCurrencies() {
    const supabase = createClient();

    const { data, error } = await supabase.from("currencies").select("*");

    if (error) {
      console.error(error);
      return;
    }

    setCurrencies(data);
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <Select
      value={currency?.id?.toString() || "all_currencies"}
      onValueChange={(value) => {
        if (value === "all_currencies") {
          setCurrency(null);
        } else {
          const selectedCurrency = currencies.find(
            (c) => c.id.toString() === value
          );
          setCurrency(selectedCurrency || null);
        }
      }}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder="Select a currency">
          {currency && (
            <div className="flex items-center gap-2">
              <Image
                src={`/images/currencies/${currency.acronym.toLowerCase()}.webp`}
                alt={currency.name}
                width={25}
                height={20}
                className="rounded-xs"
              />
              {currency.name}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className={contentClassName}>
        <SelectItem value="all_currencies">All Currencies</SelectItem>
        {currencies.map((currency) => (
          <SelectItem key={currency.id} value={currency.id.toString()}>
            <div className="flex items-center gap-2">
              <Image
                src={`/images/currencies/${currency.acronym.toLowerCase()}.webp`}
                alt={currency.name}
                width={25}
                height={20}
                className="rounded-xs"
              />
              {currency.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
