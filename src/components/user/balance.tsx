"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Balance = {
  current: number;
  pending: number;
};

export function UserBalance() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<Balance>({ current: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBalance() {
      if (!user?.id) return;

      const supabase = createClient();

      // Get current balance from user_balance_entries
      const { data: balanceEntries } = await supabase
        .from("user_balance_entries")
        .select("amount, type, updated_balance")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      // Get pending balance from approved transactions that haven't been credited
      const { data: pendingTransactions } = await supabase
        .from("user_transactions")
        .select("total_commission, user_commission_reward_pct")
        .eq("user_id", user.id)
        .eq("transaction_status", "approved")
        .is("credited", false);

      const currentBalance = balanceEntries?.[0]?.updated_balance || 0;
      const pendingBalance = pendingTransactions?.reduce((sum, t) => {
        return sum + (t.total_commission * (t.user_commission_reward_pct / 100));
      }, 0) || 0;

      setBalance({
        current: currentBalance,
        pending: pendingBalance,
      });
      setLoading(false);
    }

    fetchBalance();
  }, [user?.id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-24 animate-pulse bg-muted rounded" />
          ) : (
            <p className="text-3xl font-bold">${balance.current.toFixed(2)}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Pending Balance</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Pending balance is when we have approved a transaction but not been paid yet, then we must credit it to you
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-24 animate-pulse bg-muted rounded" />
          ) : (
            <p className="text-3xl font-bold">${balance.pending.toFixed(2)}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 