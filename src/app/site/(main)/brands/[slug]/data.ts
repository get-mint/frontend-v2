import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

const fetchBrandData = async (slug: string) => {
  const supabase = createAdminClient();

  const { data: brand, error } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !brand) {
    console.error("Error fetching brand:", error);
    return null;
  }

  return brand as Tables<"brands">;
};

export const fetchBrand = unstable_cache(fetchBrandData, ["brand"], {
  revalidate: 3600,
});
