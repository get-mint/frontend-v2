"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function Balance() {
  const { user, selectedCurrency } = useAuth();

  const [balance, setBalance] = useState<number>(0);
  const [pendingBalance, setPendingBalance] = useState<number>(0);

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
        .limit(1);

      if (error) {
        console.error(error);
      }

      setBalance(data?.[0].balance || 0);
    };

    fetchBalance();
  }, [user, selectedCurrency]);

  useEffect(() => {
    if (!user || !selectedCurrency) {
      return;
    }

    const fetchPendingBalance = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("transactions")
        .select("user_share_usd")
        .eq("user_id", user?.id)
        .eq("status", "pending");

      if (error) {
        console.error(error);
      }

      const total =
        data?.reduce(
          (sum, transaction) => sum + transaction.user_share_usd,
          0
        ) || 0;
      setPendingBalance(total);
    };

    fetchPendingBalance();
  }, [user, selectedCurrency]);

  const progress = Math.min((balance / 10) * 100, 100);
  const withdrawalThreshold = 10;
  const amountNeeded = Math.max(withdrawalThreshold - balance, 0).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Balance</CardTitle>

        <span className="text-5xl font-extrabold">
          ${balance.toFixed(2)}
        </span>

        <Progress value={progress} className="h-3 mt-3 mb-2" />

        <span className="mb-2 text-sm font-medium text-muted-foreground">
          {balance < withdrawalThreshold
            ? `${selectedCurrency?.symbol}${amountNeeded} more to unlock withdrawal!`
            : "You can now withdraw your funds!"}
        </span>

        <Button
          disabled={balance < withdrawalThreshold}
          variant="default"
          className="w-full rounded-md"
        >
          Withdraw
        </Button>
      </CardHeader>

      <CardContent>
        <h2 className="mb-1 font-semibold">Pending Balance</h2>

        <div className="flex flex-col gap-2">
          <span className="text-4xl font-extrabold">
            ${pendingBalance.toFixed(2)}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            Cashback pending approval
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
