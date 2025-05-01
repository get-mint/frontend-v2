"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Balance() {
  const { user, selectedCurrency } = useAuth();

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!user || !selectedCurrency) {
      return;
    }

    const fetchBalance = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("user_balance_entries")
        .select("balance")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })
        .eq("currency_id", selectedCurrency?.id)
        .limit(1);

      if (error) {
        console.error(error);
      }

      setBalance(data?.[0].balance || 0);
    };

    fetchBalance();
  }, [user, selectedCurrency]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{balance}</p>
      </CardContent>
    </Card>
  );
}
