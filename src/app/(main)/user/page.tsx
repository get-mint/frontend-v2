"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TransactionStats = {
  totalEarnings: number;
  transactionCount: number;
};

export default function UserPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState<TransactionStats>({
    totalEarnings: 0,
    transactionCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!user?.id) return;

      const supabase = createClient();

      const { data: earningsData } = await supabase
        .from("user_transactions")
        .select("total_commission")
        .eq("user_id", user.id)
        .eq("transaction_status", "APPROVED");

      const { count } = await supabase
        .from("user_transactions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

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
  }, [user?.id]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 w-24 animate-pulse bg-muted rounded" />
            ) : (
              <p className="text-3xl font-bold">
                ${stats.totalEarnings.toFixed(2)}
              </p>
            )}
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
