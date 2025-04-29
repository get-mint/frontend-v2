"use client";

import { useState, useEffect } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Brands } from "./brands";

export function TopBrands() {
  const { user } = useAuth();

  const [brands, setBrands] = useState<Tables<"brands">[]>([]);

  useEffect(() => {
    const getBrands = async () => {
      const supabase = createClient();

      let query = supabase
        .from("brands")
        .select("*")
        .order("priority", { ascending: true })
        .limit(10);

      if (user?.selected_currency_id) {
        query = query.eq("currency_id", user?.selected_currency_id);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setBrands(data);
    };

    getBrands();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Top Brands</h1>

      <Brands brands={brands} />
    </div>
  );
}
