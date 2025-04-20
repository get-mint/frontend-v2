"use client";

import { useState, useEffect, useMemo } from "react";
import { format, startOfMonth, subMonths, isThisMonth, isThisYear, getYear } from "date-fns";
import { ChevronDown, ChevronUp, Search, Clock, CheckCircle, CircleDollarSign, AlertCircle, Calendar, ArrowUpDown } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/providers/currency-provider";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CurrencySelect } from "@/components/currency-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 15;

type Transaction = {
  id: string;
  created_at: string;
  sale_amount: number;
  total_commission: number;
  transaction_status: "PENDING" | "APPROVED" | "DECLINED" | "EXPIRED" | "PAID";
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

// Time groups for transactions
type TimeGroup = {
  label: string;
  transactions: Transaction[];
};

export default function ActivityPage() {
  const { user } = useAuth();
  const { currency, loading: currencyLoading } = useCurrency();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Fetch transactions with network info
  useEffect(() => {
    async function fetchTransactions() {
      if (!user?.user_id || !currency?.id) return;

      setLoading(true);
      const supabase = createClient();
      
      // Build query with status filter if not 'all'
      let query = supabase
        .from("user_transactions")
        .select(`
          *,
          advertiser:advertisers(name, image_url),
          network:networks(name)
        `)
        .eq("user_id", user.user_id)
        .eq("currency_id", currency.id);
        
      if (statusFilter !== "all") {
        query = query.eq("transaction_status", statusFilter.toUpperCase());
      }
      
      // Apply sorting
      const sortColumn = sortBy === "date" ? "created_at" : "total_commission";
      query = query.order(sortColumn, { ascending: sortDirection === "asc" });
      
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

      setTransactions(data as Transaction[] || []);
      setLoading(false);
    }

    if (currency) {
      fetchTransactions();
    }
  }, [user?.user_id, currentPage, currency, statusFilter, sortBy, sortDirection]);

  // Handle toggling of expanded state for a transaction
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get status icon based on transaction status
  const getStatusIcon = (status: Transaction["transaction_status"]) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "PENDING":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "PAID":
        return <CircleDollarSign className="w-4 h-4 text-blue-500" />;
      case "DECLINED":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "EXPIRED":
        return <Calendar className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  // Get card background color based on status
  const getStatusBgColor = (status: Transaction["transaction_status"]) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-50";
      case "PENDING":
        return "bg-amber-50";
      case "PAID": 
        return "bg-blue-50";
      case "DECLINED":
        return "bg-red-50";
      case "EXPIRED":
        return "bg-gray-50";
      default:
        return "";
    }
  };

  // Get approval estimate message
  const getApprovalEstimate = (status: Transaction["transaction_status"]) => {
    if (status !== "PENDING") return null;
    
    return "Usually approves in 30-45 days";
  };

  // Filter transactions by search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions;
    
    return transactions.filter(transaction => 
      transaction.advertiser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.total_commission.toString().includes(searchQuery)
    );
  }, [transactions, searchQuery]);

  // Group transactions by time period
  const groupedTransactions = useMemo(() => {
    if (!filteredTransactions.length) return [];
    
    const thisMonth: Transaction[] = [];
    const previousMonthTransactions: Transaction[] = [];
    const thisYearOlderTransactions: Transaction[] = [];
    const olderTransactions: Transaction[] = [];
    
    const previousMonthDate = subMonths(new Date(), 1);
    const previousMonthLabel = format(previousMonthDate, "MMMM yyyy");
    
    filteredTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.created_at);
      
      if (isThisMonth(transactionDate)) {
        thisMonth.push(transaction);
      } else if (
        transactionDate.getMonth() === previousMonthDate.getMonth() &&
        transactionDate.getFullYear() === previousMonthDate.getFullYear()
      ) {
        previousMonthTransactions.push(transaction);
      } else if (isThisYear(transactionDate)) {
        thisYearOlderTransactions.push(transaction);
      } else {
        olderTransactions.push(transaction);
      }
    });
    
    const groups: TimeGroup[] = [];
    
    if (thisMonth.length > 0) {
      groups.push({ label: "This Month", transactions: thisMonth });
    }
    
    if (previousMonthTransactions.length > 0) {
      groups.push({ label: previousMonthLabel, transactions: previousMonthTransactions });
    }
    
    if (thisYearOlderTransactions.length > 0) {
      groups.push({ 
        label: `${getYear(new Date())}`, 
        transactions: thisYearOlderTransactions 
      });
    }
    
    if (olderTransactions.length > 0) {
      olderTransactions.sort((a, b) => {
        const yearA = getYear(new Date(a.created_at));
        const yearB = getYear(new Date(b.created_at));
        return yearB - yearA;
      });
      
      // Group older transactions by year
      const byYear = olderTransactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
        const year = getYear(new Date(transaction.created_at)).toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(transaction);
        return acc;
      }, {});
      
      Object.entries(byYear).forEach(([year, transactions]) => {
        groups.push({ label: year, transactions });
      });
    }
    
    return groups;
  }, [filteredTransactions]);

  const isLoading = loading || currencyLoading;

  const handleSort = (column: "date" | "amount") => {
    if (sortBy === column) {
      // Toggle direction if clicking the same column
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to descending
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Activity</h2>
        <CurrencySelect triggerClassName="w-[180px]" />
      </div>

      <Card>
        <CardHeader className="pb-2 space-y-0">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <CardTitle>Transaction History</CardTitle>
            
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by store or amount"
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`gap-1 ${sortBy === "date" ? 'bg-accent' : ''}`}
                  onClick={() => handleSort("date")}
                >
                  Date
                  {sortBy === "date" && (
                    <ArrowUpDown className="w-3 h-3" />
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`gap-1 ${sortBy === "amount" ? 'bg-accent' : ''}`}
                  onClick={() => handleSort("amount")}
                >
                  Amount
                  {sortBy === "amount" && (
                    <ArrowUpDown className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>
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
                <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {groupedTransactions.map((group) => (
                <div key={group.label} className="space-y-3">
                  <h3 className="text-lg font-semibold">{group.label}</h3>
                  
                  <div className="space-y-3">
                    {group.transactions.map((transaction) => {
                      const earnedAmount =
                        transaction.total_commission *
                        (transaction.user_commission_reward_pct / 100);
                      const isExpanded = !!expandedItems[transaction.id];
                      const statusBgColor = getStatusBgColor(transaction.transaction_status);

                      return (
                        <Collapsible
                          key={transaction.id}
                          open={isExpanded}
                          onOpenChange={() => toggleExpand(transaction.id)}
                          className={`border rounded-lg overflow-hidden transition-colors ${statusBgColor}`}
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
                                      <p className="text-lg font-medium">{transaction.advertiser.name}</p>
                                      <p className="font-medium text-green-600">
                                        +{currency?.symbol || "$"}
                                        {earnedAmount.toFixed(2)}
                                      </p>
                                    </div>
                                    
                                    <div className="flex flex-wrap mt-1 text-sm gap-x-4 gap-y-1 text-muted-foreground">
                                      <p>{format(new Date(transaction.created_at), "MMM d, yyyy")}</p>
                                      <p>
                                        {currency?.symbol || "$"}
                                        {transaction.sale_amount.toFixed(2)} purchase
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                                    <div className="flex items-center gap-1.5">
                                      {getStatusIcon(transaction.transaction_status)}
                                      <Badge
                                        variant="outline"
                                        className={`
                                          ${transaction.transaction_status === "APPROVED" ? "border-green-200 text-green-700" : ""}
                                          ${transaction.transaction_status === "PENDING" ? "border-amber-200 text-amber-700" : ""}
                                          ${transaction.transaction_status === "DECLINED" ? "border-red-200 text-red-700" : ""}
                                          ${transaction.transaction_status === "EXPIRED" ? "border-gray-200 text-gray-700" : ""}
                                          ${transaction.transaction_status === "PAID" ? "border-blue-200 text-blue-700" : ""}
                                        `}
                                      >
                                        {transaction.transaction_status}
                                      </Badge>
                                    </div>
                                    
                                    <CollapsibleTrigger asChild>
                                      <Button variant="ghost" size="sm" className="p-0 rounded-full w-7 h-7">
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
                                      Transaction ID: <span className="font-mono">{transaction.id.slice(0, 8)}</span>
                                    </p>
                                    {transaction.order_id && (
                                      <p className="text-muted-foreground">
                                        Order ID: <span className="font-mono">{transaction.order_id}</span>
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
                                    {transaction.transaction_status === "PENDING" && (
                                      <p className="text-muted-foreground">
                                        Est. Approval Date: {format(
                                          new Date(new Date(transaction.created_at).setDate(
                                            new Date(transaction.created_at).getDate() + 45
                                          )),
                                          "MMM d, yyyy"
                                        )}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {transaction.transaction_status === "PENDING" && (
                                <div className="text-right">
                                  <Button variant="link" size="sm" className="h-auto p-0 text-muted-foreground">
                                    Having issues with this transaction?
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>
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
    </div>
  );
}
