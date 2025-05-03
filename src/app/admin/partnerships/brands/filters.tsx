"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";

export function BrandsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedNetwork, setSelectedNetwork] = useState(searchParams.get("network") || "all");
  const [selectedCurrency, setSelectedCurrency] = useState(searchParams.get("currency") || "all");
  
  const [networks, setNetworks] = useState<Tables<"networks">[]>([]);
  const [currencies, setCurrencies] = useState<Tables<"currencies">[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch networks and currencies
  useEffect(() => {
    async function fetchFilterData() {
      setIsLoading(true);
      const supabase = createClient();
      
      // Fetch networks
      const { data: networksData } = await supabase
        .from("networks")
        .select("*")
        .order("name");
      
      // Fetch currencies
      const { data: currenciesData } = await supabase
        .from("currencies")
        .select("*")
        .order("name");
      
      if (networksData) setNetworks(networksData);
      if (currenciesData) setCurrencies(currenciesData);
      
      setIsLoading(false);
    }
    
    fetchFilterData();
  }, []);

  // Handle search input submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters("search", searchTerm);
  };

  // Update the URL with filter parameters
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset page when changing filters
    params.delete("page");
    
    // Update or remove the parameter
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="pb-8 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search brands..."
              className="h-10 pl-10 rounded-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit" 
              size="sm" 
              className="absolute top-0 right-0 h-10 rounded-l-none rounded-r-2xl"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Network Filter */}
        <div className="w-full md:w-64">
          <Select
            value={selectedNetwork}
            onValueChange={(value) => {
              setSelectedNetwork(value);
              updateFilters("network", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Networks</SelectItem>
              {networks.map((network) => (
                <SelectItem key={network.id} value={network.id.toString()}>
                  {network.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Currency Filter */}
        <div className="w-full md:w-64">
          <Select
            value={selectedCurrency}
            onValueChange={(value) => {
              setSelectedCurrency(value);
              updateFilters("currency", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Currencies</SelectItem>
              {currencies.map((currency) => (
                <SelectItem key={currency.id} value={currency.id.toString()}>
                  {currency.name} ({currency.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters */}
      {(searchTerm || selectedNetwork !== "all" || selectedCurrency !== "all") && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          
          {searchTerm && (
            <div className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-primary/10">
              <span>Search: {searchTerm}</span>
              <Button
                variant="ghost"
                size="sm"
                className="w-5 h-5 p-0"
                onClick={() => {
                  setSearchTerm("");
                  updateFilters("search", "");
                }}
              >
                ×
              </Button>
            </div>
          )}
          
          {selectedNetwork !== "all" && (
            <div className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-primary/10">
              <span>
                Network: {networks.find(n => n.id.toString() === selectedNetwork)?.name || selectedNetwork}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="w-5 h-5 p-0"
                onClick={() => {
                  setSelectedNetwork("all");
                  updateFilters("network", "all");
                }}
              >
                ×
              </Button>
            </div>
          )}
          
          {selectedCurrency !== "all" && (
            <div className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-primary/10">
              <span>
                Currency: {currencies.find(c => c.id.toString() === selectedCurrency)?.name || selectedCurrency}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="w-5 h-5 p-0"
                onClick={() => {
                  setSelectedCurrency("all");
                  updateFilters("currency", "all");
                }}
              >
                ×
              </Button>
            </div>
          )}
          
          {(searchTerm || selectedNetwork !== "all" || selectedCurrency !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedNetwork("all");
                setSelectedCurrency("all");
                router.push(pathname);
              }}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 