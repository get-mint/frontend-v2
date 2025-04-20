"use client";

import { createContext, useState, useEffect } from "react";

import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

export const CurrencyContext = createContext<
  | {
      currency: Tables<"currencies"> | undefined;
      setCurrency: (currency: Tables<"currencies"> | undefined) => void;
      currencies: Tables<"currencies">[];
    }
  | undefined
>(undefined);

/**
 * These are the regions that map to the currencies.
 * The default currency is USD.
 */
const CURRENCY_REGIONS = {
  // Brazilian Real
  BR: "BRL",
  // US Dollar (default)
  US: "USD",
  MX: "USD",
  // Canadian Dollar
  CA: "CAD",
  // Great Britain Pound
  GB: "GBP",
  // Euro
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  BE: "EUR",
  SE: "EUR",
  GR: "EUR",
  // Australian Dollar
  AU: "AUD",
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Tables<"currencies"> | undefined>(
    undefined
  );
  const [currencies, setCurrencies] = useState<Tables<"currencies">[]>([]);

  const fetchCurrencies = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("currencies").select("*");

    if (error) {
      console.error("Error fetching currencies:", error);
      return;
    }

    setCurrencies(data);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
}
