"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Transaction = {
  id: string;
  created_at: string;
  user_cashback: number;
  brand: {
    name: string;
    image_url: string | null;
    color: string;
  };
};

export default function Transactions() {
  const { user, selectedCurrency } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!user || !selectedCurrency) {
      return;
    }

    const fetchRecentTransactions = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("transactions")
        .select(
          "id, created_at, user_cashback, brand: brands(id, name, image_url)"
        )
        .eq("user_id", user?.id)
        .eq("currency_id", selectedCurrency?.id)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error(error);
        return;
      }

      setTransactions(data as unknown as Transaction[]);
    };

    fetchRecentTransactions();
  }, [user, selectedCurrency]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <Link href="/user/activity">
          <Button variant="outline">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col divide-y">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={transaction.brand.image_url || ""}
                    alt={transaction.brand.name}
                    className="object-contain h-10 w-22"
                  />
                  <div>
                    <p className="font-semibold">{transaction.brand.name}</p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {formatDate(transaction.created_at)}
                    </p>
                  </div>
                </div>
                
                <span className="text-xl font-bold text-primary">
                  +{selectedCurrency?.symbol}
                  {transaction.user_cashback.toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No recent transactions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
