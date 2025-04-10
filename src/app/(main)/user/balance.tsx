"use client";

import { useEffect, useState } from "react";
import { Info, ArrowUpRight } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Currency = {
  id: string;
  acronym: string;
  name: string;
  symbol: string;
};

type Balance = {
  current: number;
  pending: number;
};

export function Balance() {
  const { user } = useAuth();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [balance, setBalance] = useState<Balance>({ current: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch currencies
  useEffect(() => {
    async function fetchCurrencies() {
      const supabase = createClient();
      const { data } = await supabase.from("currencies").select("*");
      if (data) {
        setCurrencies(data);
        const usd = data.find((c) => c.acronym === "USD");
        if (usd) {
          setSelectedCurrency(usd.id);
        }
      }
    }
    fetchCurrencies();
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      if (!user?.id || !selectedCurrency) return;

      const supabase = createClient();

      // Get current balance from user_balance_entries
      const { data: balanceEntries } = await supabase
        .from("user_balance_entries")
        .select("amount, type, updated_balance")
        .eq("user_id", user.id)
        .eq("currency_id", selectedCurrency)
        .order("created_at", { ascending: false })
        .limit(1);

      // Get pending balance from approved transactions that haven't been credited
      const { data: pendingTransactions } = await supabase
        .from("user_transactions")
        .select("total_commission, user_commission_reward_pct")
        .eq("user_id", user.id)
        .eq("currency_id", selectedCurrency)
        .in("transaction_status", ["approved", "pending"])
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
  }, [user?.id, selectedCurrency]);

  const selectedCurrencyData = currencies.find(
    (c) => c.id === selectedCurrency
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.id} value={currency.id}>
                {currency.acronym} - {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Current Balance</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
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
              {loading ? (
                <div className="h-8 w-24 animate-pulse bg-muted rounded" />
              ) : (
                <p className="text-3xl font-bold">
                  {selectedCurrencyData?.symbol || "$"}
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
                <ArrowUpRight className="h-4 w-4" />
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
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
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
            {loading ? (
              <div className="h-8 w-24 animate-pulse bg-muted rounded" />
            ) : (
              <p className="text-3xl font-bold">
                {selectedCurrencyData?.symbol || "$"}
                {balance.pending.toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
