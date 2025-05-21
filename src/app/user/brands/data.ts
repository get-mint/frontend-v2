import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

export const PAGE_SIZE = 20;

export async function getBrands(
  search: string,
  page: number,
  categoryId?: string
) {
  const supabase = createClient();

  let query;

  if (categoryId) {
    query = supabase
      .from("brands")
      .select("*, brands_categories!inner(*)")
      .eq("brands_categories.brand_category_id", categoryId)
      .order("priority", { ascending: true });
  } else {
    query = supabase
      .from("brands")
      .select("*")
      .order("priority", { ascending: true });
  }


  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data } = await query.range(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE - 1
  );

  return data as Tables<"brands">[];
}

export async function getCategoryFromId(categoryId: string) {
  const supabase = createClient();

  const { data } = await supabase
    .from("brand_categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  return data as Tables<"brand_categories">;
}
