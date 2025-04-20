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

export function CurrencySelect() {
  const [currencies, setCurrencies] = useState<Tables<"currencies">[]>([]);
  const [currency, setCurrency] = useState("USD");

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
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger>
        <SelectValue placeholder="Select a currency" />
      </SelectTrigger>

      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.id} value={currency.id}>
            {currency.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
