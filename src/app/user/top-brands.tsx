"use client";

import { createAdminClient } from "@/lib/supabase/server/client";
import { useAuth } from "@/lib/hooks/use-auth";

import { Tables } from "@/types/supabase";

import { Brands } from "./brands";

async function getBrands(currencyId?: number) {
  const supabase = createAdminClient();

  let query = supabase
    .from("brands")
    .select("*")
    .order("priority", { ascending: true })
    .limit(10);

  if (currencyId) {
    query = query.eq("currency_id", currencyId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as Tables<"brands">[];
}

export async function TopBrands() {
  const { user } = useAuth();

  const brands = await getBrands(user?.selected_currency_id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Top Brands</h1>

      <Brands brands={brands} />
    </div>
  );
}
