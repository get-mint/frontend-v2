"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Currency = {
  id: string;
  acronym: string;
  name: string;
  symbol: string;
};

type TransactionStats = {
  totalEarnings: number;
  transactionCount: number;
};

export default function UserPage() {
  const { user } = useAuth();

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [stats, setStats] = useState<TransactionStats>({
    totalEarnings: 0,
    transactionCount: 0,
  });
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
    async function fetchStats() {
      if (!user?.id || !selectedCurrency) return;

      const supabase = createClient();

      const { data: earningsData } = await supabase
        .from("user_transactions")
        .select("total_commission")
        .eq("user_id", user.id)
        .eq("currency_id", selectedCurrency)
        .eq("transaction_status", "APPROVED");

      const { count } = await supabase
        .from("user_transactions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("currency_id", selectedCurrency);

      setStats({
        totalEarnings:
          earningsData?.reduce(
            (sum, t) => sum + (t.total_commission || 0),
            0
          ) || 0,
        transactionCount: count || 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, [user?.id, selectedCurrency]);

  const selectedCurrencyData = currencies.find(
    (c) => c.id === selectedCurrency
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {loading ? (
                <div className="h-8 w-24 animate-pulse bg-muted rounded" />
              ) : (
                <p className="text-3xl font-bold">
                  {selectedCurrencyData?.symbol || "$"}
                  {stats.totalEarnings.toFixed(2)}
                </p>
              )}

              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 w-24 animate-pulse bg-muted rounded" />
            ) : (
              <p className="text-3xl font-bold">{stats.transactionCount}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
