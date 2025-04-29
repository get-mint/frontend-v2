"use client";

import { useState, useEffect } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Brands } from "./brands";

async function getBrands(currencyId?: number) {
  const supabase = createClient();

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

export function TopBrands() {
  const { user } = useAuth();

  const [brands, setBrands] = useState<Tables<"brands">[]>([]);

  useEffect(() => {
    getBrands(user?.selected_currency_id).then(setBrands);
  }, [user?.selected_currency_id]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Top Brands</h1>

      <Brands brands={brands} />
    </div>
  );
}
