import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

import { Brands } from "./brands";

async function getBrands() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("priority", { ascending: true })
    .limit(10);

  if (error) {
    throw error;
  }

  return data as Tables<"brands">[];
}

export async function TopBrands() {
  const brands = await getBrands();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Top Brands</h1>

      <Brands brands={brands} />
    </div>
  );
}
