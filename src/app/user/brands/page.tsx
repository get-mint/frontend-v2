"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Brands, BrandsSkeleton } from "../brands";
import { SearchIcon, TagsIcon } from "lucide-react";

async function getBrands(search: string, page: number, categoryId?: string) {
  const supabase = createClient();

  let query = supabase
    .from("brands")
    .select("*, brands_categories!inner(*)")
    .order("priority", { ascending: true });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (categoryId) {
    query = query.eq("brands_categories.brand_category_id", categoryId);
  }

  const { data, error } = await query.range((page - 1) * 10, page * 10 - 1);

  if (error) {
    throw error;
  }

  return data as Tables<"brands">[];
}

async function getCategoryFromId(categoryId: string) {
  const supabase = createClient();

  const { data } = await supabase
    .from("brand_categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  return data as Tables<"brand_categories">;
}

export default function BrandsPage() {
  const searchParams = useSearchParams();

  const [brands, setBrands] = useState<Tables<"brands">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<
    Tables<"brand_categories"> | undefined
  >(undefined);

  useEffect(() => {
    const loadBrands = async () => {
      setIsLoading(true);

      const search = searchParams.get("search") || "";
      const page = parseInt(searchParams.get("page") || "1");
      const categoryId = searchParams.get("category") || "";

      if (categoryId) {
        const category = await getCategoryFromId(categoryId);
        setCategory(category);
      }

      const data = await getBrands(search, page, categoryId);
      setBrands(data);

      setIsLoading(false);
    };

    loadBrands();
  }, [searchParams]);

  const searchTerm = searchParams.get("search") || "";
  const hasCategory = searchParams.has("category");

  return (
    <div className="flex flex-col gap-6">
      {(searchTerm || hasCategory) && (
        <div className="flex flex-col gap-2">
          {searchTerm && (
            <div className="flex flex-row items-center gap-3 px-6 py-4 rounded-xl bg-muted">
              <SearchIcon className="size-6" />

              <span className="text-xl font-semibold">
                Searching for:
              </span>

              <h3 className="px-4 py-2 text-xl font-bold text-white rounded-full bg-primary">
                {searchTerm}
              </h3>
            </div>
          )}

          {hasCategory && category && (
            <div className="flex flex-row items-center gap-3 px-6 py-4 rounded-xl bg-muted">
              <TagsIcon className="size-6" />
              
              <span className="text-xl font-semibold">
                Filtering by category:
              </span>

              <h3 className="px-4 py-2 text-xl font-bold text-white rounded-full bg-primary">
                {category.name}
              </h3>
            </div>
          )}
        </div>
      )}

      {isLoading ? <BrandsSkeleton /> : <Brands brands={brands} />}
    </div>
  );
}
