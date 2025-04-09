"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const ITEMS_PER_PAGE = 10;

type Transaction = {
  id: string;
  created_at: string;
  sale_amount: number;
  total_commission: number;
  transaction_status: "PENDING" | "APPROVED" | "DECLINED" | "EXPIRED" | "PAID";
  advertiser_id: string;
  network_id: string;
  user_commission_reward_pct: number;
  advertiser: {
    name: string;
    image_url: string | null;
  };
};

export default function ActivityPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchTransactions() {
      if (!user?.id) return;

      const supabase = createClient();

      // Get total count for pagination
      const { count } = await supabase
        .from("user_transactions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));

      // Get paginated transactions with advertiser info
      const { data } = await supabase
        .from("user_transactions")
        .select(
          `
          *,
          advertiser:advertisers(name, image_url)
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .range(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE - 1
        );

      setTransactions(data || []);
      setLoading(false);
    }

    fetchTransactions();
  }, [user?.id, currentPage]);

  const getStatusVariant = (status: Transaction["transaction_status"]) => {
    switch (status) {
      case "APPROVED":
        return "default";
      case "PENDING":
        return "secondary";
      case "DECLINED":
        return "destructive";
      case "EXPIRED":
        return "outline";
      case "PAID":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 w-full animate-pulse bg-muted rounded"
                />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No transactions found
            </p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => {
                const earnedAmount =
                  transaction.total_commission *
                  (transaction.user_commission_reward_pct / 100);

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {transaction.advertiser.image_url && (
                        <img
                          src={transaction.advertiser.image_url}
                          alt={transaction.advertiser.name}
                          className="h-10 w-10 rounded object-contain"
                        />
                      )}
                      <div>
                        <p className="font-medium">
                          {transaction.advertiser.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(
                            new Date(transaction.created_at),
                            "MMM d, yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">
                        +${earnedAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${transaction.sale_amount.toFixed(2)} purchase
                      </p>
                      <Badge
                        variant={getStatusVariant(
                          transaction.transaction_status
                        )}
                      >
                        {transaction.transaction_status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
