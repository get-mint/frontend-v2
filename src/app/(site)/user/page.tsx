"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Info, LineChart } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/providers/currency-provider";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

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

type Transaction = {
  id: string;
  created_at: string;
  total_commission: number;
  transaction_status: "PENDING" | "APPROVED" | "DECLINED" | "EXPIRED" | "PAID";
  advertiser: {
    name: string;
    image_url: string | null;
  };
  user_commission_reward_pct: number;
};

export default function UserPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { currency, loading: currencyLoading } = useCurrency();

  const [stats, setStats] = useState<TransactionStats>({
    totalEarnings: 0,
    transactionCount: 0,
  });
  const [balance, setBalance] = useState({ current: 0, pending: 0 });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user stats and balance
  useEffect(() => {
    async function fetchUserData() {
      if (!user?.user_id || !currency?.id) return;

      setLoading(true);
      const supabase = createClient();

      // Get stats
      const { data: earningsData } = await supabase
        .from("user_transactions")
        .select("total_commission")
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id)
        .eq("transaction_status", "APPROVED");

      const { count } = await supabase
        .from("user_transactions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id);

      // Get current balance
      const { data: balanceEntries } = await supabase
        .from("user_balance_entries")
        .select("updated_balance")
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id)
        .order("created_at", { ascending: false })
        .limit(1);

      // Get pending balance
      const { data: pendingTransactions } = await supabase
        .from("user_transactions")
        .select("total_commission, user_commission_reward_pct")
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id)
        .in("transaction_status", ["approved", "pending"]);

      // Get recent transactions for activity feed
      const { data: recentActivityData } = await supabase
        .from("user_transactions")
        .select(`
          id,
          created_at,
          total_commission,
          transaction_status,
          user_commission_reward_pct,
          advertiser:advertisers(name, image_url)
        `)
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id)
        .order("created_at", { ascending: false })
        .limit(3);

      const currentBalance = balanceEntries?.[0]?.updated_balance || 0;
      const pendingBalance = pendingTransactions?.reduce((sum, t) => {
        return sum + (t.total_commission * (t.user_commission_reward_pct / 100));
      }, 0) || 0;

      setStats({
        totalEarnings: earningsData?.reduce(
          (sum, t) => sum + (t.total_commission || 0),
          0
        ) || 0,
        transactionCount: count || 0,
      });

      setBalance({
        current: currentBalance,
        pending: pendingBalance,
      });

      setRecentTransactions(recentActivityData as unknown as Transaction[] || []);
      setLoading(false);
    }

    if (currency) {
      fetchUserData();
    }
  }, [user?.user_id, currency]);

  const isLoading = loading || currencyLoading;

  return (
    <div className="space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Section 1: Key Balance Snapshot */}
        <Card className="md:col-span-1">
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
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="w-full h-12 rounded animate-pulse bg-muted" />
            ) : (
              <p className="text-4xl font-bold">
                {currency?.symbol || "$"}
                {balance.current.toFixed(2)}
              </p>
            )}
            
            <Button
              variant="outline"
              size="sm"
              disabled={balance.current < 5}
              className="w-full"
            >
              Withdraw
            </Button>
            
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">Pending Balance</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Pending balance is when we have approved a transaction but
                        not been paid yet. This amount will be added to your current 
                        balance once fully processed.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {isLoading ? (
                <div className="w-1/2 mt-1 rounded h-7 animate-pulse bg-muted" />
              ) : (
                <p className="text-xl font-medium text-muted-foreground">
                  {currency?.symbol || "$"}
                  {balance.pending.toFixed(2)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Earnings & History */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Earnings & History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-1 text-sm font-medium">Total Earnings</h3>
              {isLoading ? (
                <div className="w-1/2 h-8 rounded animate-pulse bg-muted" />
              ) : (
                <p className="text-2xl font-bold">
                  {currency?.symbol || "$"}
                  {stats.totalEarnings.toFixed(2)}
                </p>
              )}
            </div>

            <div className="pt-2">
              <h3 className="mb-1 text-sm font-medium">Total Transactions</h3>
              {isLoading ? (
                <div className="w-1/3 h-8 rounded animate-pulse bg-muted" />
              ) : (
                <p className="text-2xl font-bold">{stats.transactionCount}</p>
              )}
            </div>
            
            {/* Mini Chart Placeholder */}
            <Card className="border-dashed bg-muted/50 border-muted">
              <CardContent className="p-4 flex items-center justify-center h-[100px]">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <LineChart className="w-8 h-8" />
                  <p className="text-xs">Earnings chart coming soon</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Section 3: Activity Feed */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link href="/user/activity">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-full rounded h-14 animate-pulse bg-muted" />
                ))}
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="py-6 space-y-4 text-center">
                <p className="text-muted-foreground">
                  You haven't earned cashback yet.
                </p>
                <Button 
                  onClick={() => router.push('/offers')} 
                  size="sm" 
                  variant="outline"
                >
                  Start shopping with Mint!
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map(transaction => {
                  const earnedAmount = transaction.total_commission * 
                    (transaction.user_commission_reward_pct / 100);
                    
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-2 text-sm border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{transaction.advertiser.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(transaction.created_at), "MMM d, yyyy")}
                        </p>
                      </div>
                      <p className="font-medium text-green-600">
                        +{currency?.symbol || "$"}
                        {earnedAmount.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
