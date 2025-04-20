"use client";

import { createContext, useState, useEffect, useMemo, useContext } from "react";

import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

export const CurrencyContext = createContext<
  | {
      currency: Tables<"currencies"> | undefined;
      setCurrency: (currency: Tables<"currencies"> | undefined) => void;
      currencies: Tables<"currencies">[];
      loading: boolean;
    }
  | undefined
>(undefined);

const CURRENCY_STORAGE_KEY = "preferred-currency";

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
  const [currency, setCurrencyState] = useState<
    Tables<"currencies"> | undefined
  >(undefined);
  const [currencies, setCurrencies] = useState<Tables<"currencies">[]>([]);
  const [loading, setLoading] = useState(true);

  const setCurrency = (newCurrency: Tables<"currencies"> | undefined) => {
    setCurrencyState(newCurrency);
    if (newCurrency) {
      localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency.acronym);
    }
  };

  const fetchCurrencies = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("currencies").select("*");

    if (error) {
      console.error("Error fetching currencies:", error);
      return [];
    }

    setCurrencies(data);
    return data;
  };

  const detectAndSetCurrency = async (
    availableCurrencies: Tables<"currencies">[]
  ) => {
    try {
      if (typeof window !== "undefined") {
        const storedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
        if (storedCurrency) {
          const savedCurrency = availableCurrencies.find(
            (c) => c.acronym === storedCurrency
          );
          if (savedCurrency) {
            setCurrencyState(savedCurrency);
            setLoading(false);
            return;
          }
        }
      }

      // Get user's location from IP geolocation service
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const countryCode = data.country_code;

      // Find appropriate currency based on location
      const currencyCode =
        CURRENCY_REGIONS[countryCode as keyof typeof CURRENCY_REGIONS] || "USD";
      const defaultCurrency =
        availableCurrencies.find((c) => c.acronym === currencyCode) ||
        availableCurrencies.find((c) => c.acronym === "USD");

      if (defaultCurrency) {
        setCurrencyState(defaultCurrency);
        if (typeof window !== "undefined") {
          localStorage.setItem(CURRENCY_STORAGE_KEY, defaultCurrency.acronym);
        }
      }
    } catch (error) {
      console.error("Error detecting location:", error);
      // Default to USD on error
      const usdCurrency = availableCurrencies.find((c) => c.acronym === "USD");
      if (usdCurrency) {
        setCurrencyState(usdCurrency);
        if (typeof window !== "undefined") {
          localStorage.setItem(CURRENCY_STORAGE_KEY, "USD");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const fetchedCurrencies = await fetchCurrencies();
      if (fetchedCurrencies.length > 0) {
        await detectAndSetCurrency(fetchedCurrencies);
      }
    };

    initialize();
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      currencies,
      loading,
    }),
    [currency, currencies, loading]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Custom hook for using the currency context
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
