"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Balance } from "./balance";

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
      if (!user?.user_id || !selectedCurrency) return;

      const supabase = createClient();

      const { data: earningsData } = await supabase
        .from("user_transactions")
        .select("total_commission")
        .eq("user_id", user.user_id)
        .eq("currency_id", selectedCurrency)
        .eq("transaction_status", "APPROVED");

      const { count } = await supabase
        .from("user_transactions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.user_id)
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
  }, [user?.user_id, selectedCurrency]);

  const selectedCurrencyData = currencies.find(
    (c) => c.id === selectedCurrency
  );

  return (
    <div className="space-y-6">
      <Balance />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {loading ? (
                <div className="w-24 h-8 rounded animate-pulse bg-muted" />
              ) : (
                <p className="text-3xl font-bold">
                  {selectedCurrencyData?.symbol || "$"}
                  {stats.totalEarnings.toFixed(2)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="w-24 h-8 rounded animate-pulse bg-muted" />
            ) : (
              <p className="text-3xl font-bold">{stats.transactionCount}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
