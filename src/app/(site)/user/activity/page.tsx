"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Clock,
  CheckCircle,
  CircleDollarSign,
  AlertCircle,
  Calendar,
} from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/providers/currency-provider";
import { Constants } from "@/types/supabase"; // Import Constants to get enum values

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 15;

// Get transaction status enum values from Supabase types
const TRANSACTION_STATUSES = Constants.public.Enums.transaction_status;

type Transaction = {
  id: string;
  created_at: string;
  sale_amount: number;
  total_commission: number;
  transaction_status: typeof TRANSACTION_STATUSES[number];
  advertiser_id: string;
  network_id: string;
  user_commission_reward_pct: number;
  currency_id: string;
  order_id?: string;
  network?: {
    name: string;
  };
  advertiser: {
    name: string;
    image_url: string | null;
  };
};

// Status icon component
const StatusIcon = ({
  status,
}: {
  status: Transaction["transaction_status"];
}) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "pending":
      return <Clock className="w-4 h-4 text-amber-500" />;
    case "paid":
      return <CircleDollarSign className="w-4 h-4 text-blue-500" />;
    case "declined":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case "expired":
      return <Calendar className="w-4 h-4 text-gray-500" />;
    case "credited":
      return <CheckCircle className="w-4 h-4 text-purple-500" />;
    default:
      return null;
  }
};

// Get status badge style based on transaction status
const getStatusStyle = (status: Transaction["transaction_status"]) => {
  switch (status) {
    case "approved":
      return "border-green-200 text-green-700 bg-green-50";
    case "pending":
      return "border-amber-200 text-amber-700 bg-amber-50";
    case "paid":
      return "border-blue-200 text-blue-700 bg-blue-50";
    case "declined":
      return "border-red-200 text-red-700 bg-red-50";
    case "expired":
      return "border-gray-200 text-gray-700 bg-gray-50";
    case "credited":
      return "border-purple-200 text-purple-700 bg-purple-50";
    default:
      return "";
  }
};

// Transaction item component
const TransactionItem = ({
  transaction,
  isExpanded,
  toggleExpand,
  currencySymbol,
}: {
  transaction: Transaction;
  isExpanded: boolean;
  toggleExpand: () => void;
  currencySymbol: string;
}) => {
  const earnedAmount =
    transaction.total_commission *
    (transaction.user_commission_reward_pct / 100);

  const getApprovalEstimate = (status: Transaction["transaction_status"]) => {
    if (status !== "pending") return null;
    return "Usually approves in 30-45 days";
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={toggleExpand}
      className="border rounded-lg overflow-hidden transition-colors"
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col w-full gap-4 sm:flex-row">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            {transaction.advertiser.image_url ? (
              <img
                src={transaction.advertiser.image_url}
                alt={transaction.advertiser.name}
                className="object-contain w-12 h-12 p-1 bg-white rounded sm:h-14 sm:w-14"
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 rounded sm:h-14 sm:w-14 bg-muted">
                {transaction.advertiser.name.charAt(0)}
              </div>
            )}
          </div>
          
          {/* Content Section */}
          <div className="flex-1">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-medium">
                    {transaction.advertiser.name}
                  </p>
                  <p className="font-medium text-green-600">
                    +{currencySymbol}
                    {earnedAmount.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex flex-wrap mt-1 text-sm gap-x-4 gap-y-1 text-muted-foreground">
                  <p>
                    {format(new Date(transaction.created_at), "MMM d, yyyy")}
                  </p>
                  <p>
                    {currencySymbol}
                    {transaction.sale_amount.toFixed(2)} purchase
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-1 sm:mt-0">
                <div className="flex items-center gap-1.5">
                  <StatusIcon status={transaction.transaction_status} />
                  <Badge
                    variant="outline"
                    className={getStatusStyle(transaction.transaction_status)}
                  >
                    {transaction.transaction_status.toUpperCase()}
                  </Badge>
                </div>
                
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 rounded-full w-7 h-7"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            
            {getApprovalEstimate(transaction.transaction_status) && (
              <p className="text-xs text-muted-foreground mt-1.5">
                <Clock className="inline-block w-3 h-3 mr-1" />
                {getApprovalEstimate(transaction.transaction_status)}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <CollapsibleContent>
        <div className="px-4 pt-1 pb-4 space-y-3 border-t sm:px-5 bg-background/50">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-1 text-sm font-medium">Transaction Details</h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  Transaction ID:{" "}
                  <span className="font-mono">
                    {transaction.id.slice(0, 8)}
                  </span>
                </p>
                {transaction.order_id && (
                  <p className="text-muted-foreground">
                    Order ID:{" "}
                    <span className="font-mono">{transaction.order_id}</span>
                  </p>
                )}
                <p className="text-muted-foreground">
                  Commission Rate: {transaction.user_commission_reward_pct}%
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="mb-1 text-sm font-medium">Network Information</h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  Network: {transaction.network?.name || "Direct"}
                </p>
                {transaction.transaction_status === "pending" && (
                  <p className="text-muted-foreground">
                    Est. Approval Date:{" "}
                    {format(
                      new Date(
                        new Date(transaction.created_at).setDate(
                          new Date(transaction.created_at).getDate() + 45
                        )
                      ),
                      "MMM d, yyyy"
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {transaction.transaction_status === "pending" && (
            <div className="text-right">
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-muted-foreground"
              >
                Having issues with this transaction?
              </Button>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Filters component
const TransactionFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  clearSearch,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  clearSearch: () => void;
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by store"
          className="pl-8 w-full md:w-[200px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full md:w-[160px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {TRANSACTION_STATUSES.map((status) => (
            <SelectItem key={status} value={status} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <StatusIcon status={status} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default function ActivityPage() {
  const { user } = useAuth();
  const { currency, loading: currencyLoading } = useCurrency();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch transactions with network info
  useEffect(() => {
    async function fetchTransactions() {
      if (!user?.user_id || !currency?.id) return;

      setLoading(true);
      const supabase = createClient();

      // Build query with status filter if not 'all'
      let query = supabase
        .from("user_transactions")
        .select(
          `
          *,
          advertiser:advertisers(name, image_url),
          network:networks(name)
        `
        )
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id);

      if (statusFilter !== "all") {
        // Use the status value directly - no need to convert case
        query = query.eq("transaction_status", statusFilter);
      }

      // Apply sorting - always by amount high to low
      query = query.order("total_commission", { ascending: false });

      // Get count for pagination
      const { count } = await supabase
        .from("user_transactions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id);

      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));

      // Get paginated results
      const { data } = await query.range(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE - 1
      );

      setTransactions((data as Transaction[]) || []);
      setLoading(false);
    }

    if (currency) {
      fetchTransactions();
    }
  }, [user?.user_id, currentPage, currency, statusFilter]);

  // Handle toggling of expanded state for a transaction
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter transactions by store name
  const filteredTransactions = transactions.filter(
    (transaction) =>
      !searchQuery ||
      transaction.advertiser.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const isLoading = loading || currencyLoading;
  const currencySymbol = currency?.symbol || "$";

  const clearSearch = () => setSearchQuery("");

  return (
    <Card>
      <CardHeader className="pb-2 space-y-0">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <CardTitle>Transaction History</CardTitle>
          <TransactionFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            clearSearch={clearSearch}
          />
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-full h-24 rounded animate-pulse bg-muted"
              />
            ))}
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-12 space-y-3 text-center text-muted-foreground">
            <p>No transactions found</p>
            {searchQuery && (
              <Button variant="outline" size="sm" onClick={clearSearch}>
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                isExpanded={!!expandedItems[transaction.id]}
                toggleExpand={() => toggleExpand(transaction.id)}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
}
