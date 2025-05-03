"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Balance({ affiliate }: { affiliate: Tables<"affiliates"> }) {
  const { selectedCurrency } = useAuth();

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!affiliate || !selectedCurrency) {
      return;
    }

    const fetchBalance = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("affiliate_balance_entries")
        .select("balance")
        .eq("affiliate_id", affiliate.id)
        .eq("currency_id", selectedCurrency.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error(error);
        return;
      }

      setBalance(data?.[0]?.balance || 0);
    };

    fetchBalance();
  }, [affiliate, selectedCurrency]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Balance</CardTitle>

        <span className="text-5xl font-extrabold">
          {selectedCurrency?.symbol}
          {balance.toFixed(2)}
        </span>
      </CardHeader>
    </Card>
  );
}
