import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

async function getBrandCategories() {
  const supabase = createAdminClient();

  const { data, error } = await supabase.from("brand_categories").select("*");

  if (error) {
    throw error;
  }

  return data as Tables<"brand_categories">[];
}

export async function Categories() {
  const brandCategories = await getBrandCategories();

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Categories</h1>

      <div className="flex flex-wrap gap-3">
        {brandCategories.map((category) => (
          <div
            key={category.id}
            className="flex shrink-0 flex-col items-center justify-center p-4 rounded-xl bg-accent transition-colors cursor-pointer min-w-[140px]"
          >
            <span className="mb-2 text-3xl">{category.emoji}</span>
            <span className="text-sm font-medium text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
