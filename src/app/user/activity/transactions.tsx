"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Transaction = {
  id: string;
  created_at: string;
  user_cashback: number;
  sale_amount: number;
  status: string;
  brand: {
    name: string;
    image_url: string | null;
    color: string;
  };
};

export default function ActivityTransactions() {
  const { user, selectedCurrency } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!user || !selectedCurrency) {
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      const supabase = createClient();

      // Get total count for pagination
      const { count } = await supabase
        .from("transactions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user?.id)
        .eq("currency_id", selectedCurrency?.id);

      if (count !== null) {
        setTotalPages(Math.ceil(count / itemsPerPage));
      }

      // Fetch paginated transactions
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error } = await supabase
        .from("transactions")
        .select(
          "id, created_at, user_cashback, sale_amount, status, brand: brands(id, name, image_url, color)"
        )
        .eq("user_id", user?.id)
        .eq("currency_id", selectedCurrency?.id)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setTransactions(data as unknown as Transaction[]);
      setLoading(false);
    };

    fetchTransactions();
  }, [user, selectedCurrency, currentPage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-amber-500";
      case "paid":
        return "text-blue-600";
      default:
        return "text-gray-500";
    }
  };

  if (loading && !transactions.length) {
    return <div className="py-10 text-center">Loading transactions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border shadow">
        <div className="bg-muted/40 p-4 rounded-t-lg">
          <div className="grid grid-cols-12 font-medium text-sm">
            <div className="col-span-5">Brand</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Cashback</div>
            <div className="col-span-1">Status</div>
          </div>
        </div>
        
        <div className="divide-y">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 grid grid-cols-12 items-center hover:bg-muted/20 transition-colors"
              >
                <div className="col-span-5 flex items-center gap-3">
                  {transaction.brand.image_url ? (
                    <img
                      src={transaction.brand.image_url}
                      alt={transaction.brand.name}
                      className="object-contain h-10 w-22"
                    />
                  ) : (
                    <div 
                      className="h-10 w-22 flex items-center justify-center text-white rounded"
                      style={{ backgroundColor: transaction.brand.color || "#888" }}
                    >
                      {transaction.brand.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium">{transaction.brand.name}</span>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {formatDate(transaction.created_at)}
                </div>
                <div className="col-span-2 font-medium">
                  {selectedCurrency?.symbol}{transaction.sale_amount.toFixed(2)}
                </div>
                <div className="col-span-2 font-bold text-primary">
                  +{selectedCurrency?.symbol}{transaction.user_cashback.toFixed(2)}
                </div>
                <div className={`col-span-1 capitalize text-sm ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              No transactions found
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              // Show current page, first, last, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              // Show ellipsis for gaps
              if (page === 2 || page === totalPages - 1) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <span className="px-1.5">...</span>
                  </PaginationItem>
                );
              }
              
              return null;
            })}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
} 