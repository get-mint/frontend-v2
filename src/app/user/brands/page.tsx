"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { SearchIcon, TagsIcon } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Brands, BrandsSkeleton } from "../brands";

const PAGE_SIZE = 20;

async function getBrands(search: string, page: number, categoryId?: string) {
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

  const { data, error } = await query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

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
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<
    Tables<"brand_categories"> | undefined
  >(undefined);

  const observer = useRef<IntersectionObserver | null>(null);

  // Function to load more brands
  const loadBrands = useCallback(async (pageNumber: number, isInitialLoad: boolean = false) => {
    setIsLoading(true);

    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("category") || "";

    if (isInitialLoad && categoryId) {
      const category = await getCategoryFromId(categoryId);
      setCategory(category);
    } else if (isInitialLoad) {
      setCategory(undefined);
    }

    const data = await getBrands(search, pageNumber, categoryId);
    
    if (isInitialLoad) {
      setBrands(data);
    } else {
      setBrands(prev => [...prev, ...data]);
    }

    setHasMore(data.length === PAGE_SIZE);
    setPage(pageNumber);
    setIsLoading(false);
  }, [searchParams]);

  // Initial load and when search params change
  useEffect(() => {
    setBrands([]);
    setPage(1);
    loadBrands(1, true);
  }, [searchParams, loadBrands]);

  // Set up intersection observer for infinite loading
  const lastBrandElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadBrands(page + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, page, loadBrands]);

  const searchTerm = searchParams.get("search") || "";
  const hasCategory = searchParams.has("category");

  return (
    <div className="flex flex-col gap-6">
      {(searchTerm || hasCategory) && (
        <div className="flex flex-col gap-2">
          {searchTerm && (
            <div className="flex flex-row items-center gap-3 px-6 py-4 rounded-xl bg-muted">
              <SearchIcon className="size-6" />

              <span className="text-xl font-semibold">Searching for:</span>

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

      {isLoading && brands.length === 0 ? (
        <BrandsSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand, index) => {
            const isLastElement = index === brands.length - 1;
            
            return (
              <div
                key={brand.id}
                ref={isLastElement ? lastBrandElementRef : null}
                className="flex flex-col gap-2 cursor-pointer group"
              >
                <div
                  className={`relative aspect-square flex items-center justify-center p-6 rounded-xl overflow-hidden ${
                    !brand.color ? "bg-muted" : ""
                  }`}
                  style={{ backgroundColor: brand.color || undefined }}
                >
                  <img
                    src={brand.image_url ?? "/placeholder.svg"}
                    alt={brand.name}
                    className="object-contain max-w-full max-h-full"
                    width={120}
                    height={120}
                  />
                  <button
                    className="absolute h-8 px-3 text-sm rounded-md bottom-2 right-2 bg-background/80 hover:bg-background backdrop-blur-sm"
                  >
                    Shop
                  </button>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="text-lg font-bold transition-all group-hover:underline">
                    {brand.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isLoading && brands.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 rounded-full animate-pulse bg-primary/20"></div>
        </div>
      )}
    </div>
  );
}
