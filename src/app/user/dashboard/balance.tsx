"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
        <CardTitle className="mb-1">Current Balance</CardTitle>
        
        <span className="text-4xl font-bold">
          {selectedCurrency?.symbol}
          {balance.toFixed(2)}
        </span>

        <Progress value={(balance / 10) * 100} className="h-4 mt-2" />
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}
