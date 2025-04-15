"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/use-auth";

import { Database } from "@/types/supabase";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { AddNewAdvertiser } from "./add-dialog";
import { AdvertisersTable } from "./table";
import { AdvertisersPagination } from "./pagination";

type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"] & {
  network?: { name: string };
  currency?: { acronym: string };
};

const ITEMS_PER_PAGE = 10;

export default function AdvertisersPage() {
  const { isAuthenticated } = useAuth();
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAdvertisers = async () => {
    setIsLoading(true);
    const supabase = createClient();

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;

    let query = supabase.from("advertisers").select(
      `
        *,
        network: networks(name),
        currency: currencies(acronym)
      `,
      { count: "exact" }
    );

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,domain.ilike.%${searchQuery}%`
      );
    }

    const { data, count, error } = await query
      .range(start, end)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching advertisers:", error);
      return;
    }

    setAdvertisers(data || []);
    setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdvertisers();
    }
  }, [isAuthenticated, currentPage, searchQuery]);

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("advertisers")
      .update({ active: !currentActive })
      .eq("id", id);

    if (error) {
      console.error("Error updating advertiser:", error);
      return;
    }

    setAdvertisers((prev) =>
      prev.map((advertiser) =>
        advertiser.id === id
          ? { ...advertiser, active: !currentActive }
          : advertiser
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Advertisers</h1>
        <AddNewAdvertiser />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Advertisers</CardTitle>
          <CardDescription>
            View and manage all advertisers in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search advertisers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <AdvertisersTable
              advertisers={advertisers}
              isLoading={isLoading}
              onAdvertiserUpdate={handleToggleActive}
              onAdvertiserEdit={fetchAdvertisers}
              onAdvertiserDelete={fetchAdvertisers}
            />
            <AdvertisersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
