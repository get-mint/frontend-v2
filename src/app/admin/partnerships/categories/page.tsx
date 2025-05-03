import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

async function fetchBrandCategories() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("brand_categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Tables<"brand_categories">[];
}

export default async function Categories() {
  const brandCategories = await fetchBrandCategories();

  return (
    <>
      <h1 className="text-4xl font-bold">Categories</h1>

      <div className="flex flex-wrap gap-3">
        {brandCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-2 p-3 rounded-lg bg-muted"
          >
            <span className="text-lg font-bold">{category.name}</span>

            <span>{category.emoji}</span>
          </div>
        ))}
      </div>
    </>
  );
}
