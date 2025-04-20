"use client";

import { useEffect, useState } from "react";
import { Info, ArrowUpRight } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/providers/currency-provider";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CurrencySelect } from "@/components/currency-select";

type Balance = {
  current: number;
  pending: number;
};

export function Balance() {
  const { user } = useAuth();
  const { currency, loading: currencyLoading } = useCurrency();
  const [balance, setBalance] = useState<Balance>({ current: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBalance() {
      if (!user?.user_id || !currency?.id) return;

      setLoading(true);
      const supabase = createClient();

      // Get current balance from user_balance_entries
      const { data: balanceEntries } = await supabase
        .from("user_balance_entries")
        .select("amount, type, updated_balance")
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id)
        .order("created_at", { ascending: false })
        .limit(1);

      // Get pending balance from approved transactions that haven't been credited
      const { data: pendingTransactions } = await supabase
        .from("user_transactions")
        .select("total_commission, user_commission_reward_pct")
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id)
        .in("transaction_status", ["approved", "pending"]);
        
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

    if (currency) {
      fetchBalance();
    }
  }, [user?.user_id, currency]);

  const isLoading = loading || currencyLoading;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CurrencySelect triggerClassName="w-[180px]" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Current Balance</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Your available balance that can be withdrawn. Minimum
                      withdrawal amount is $5.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {isLoading ? (
                <div className="w-24 h-8 rounded animate-pulse bg-muted" />
              ) : (
                <p className="text-3xl font-bold">
                  {currency?.symbol || "$"}
                  {balance.current.toFixed(2)}
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                disabled={balance.current < 5}
                className="gap-2"
              >
                Withdraw
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Pending Balance</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Pending balance is when we have approved a transaction but
                      not been paid yet, then we must credit it to you. This
                      amount will be added to your current balance once the
                      transaction is fully processed.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="w-24 h-8 rounded animate-pulse bg-muted" />
            ) : (
              <p className="text-3xl font-bold">
                {currency?.symbol || "$"}
                {balance.pending.toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
