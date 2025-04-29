"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { SearchIcon, TagsIcon } from "lucide-react";

import { Tables } from "@/types/supabase";

import { Brands, BrandsSkeleton } from "../brands";
import { getBrands, getCategoryFromId, PAGE_SIZE } from "./data";

export default function BrandsPage() {
  const searchParams = useSearchParams();

  const [brands, setBrands] = useState<Tables<"brands">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<
    Tables<"brand_categories"> | undefined
  >(undefined);

  const lastBrandRef = useRef<HTMLDivElement>(null);

  const loadBrands = useCallback(
    async (pageNumber: number, isInitialLoad: boolean = false) => {
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
        setBrands((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === PAGE_SIZE);
      setPage(pageNumber);
      setIsLoading(false);
    },
    [searchParams]
  );

  useEffect(() => {
    setBrands([]);
    setPage(1);
    loadBrands(1, true);
  }, [searchParams, loadBrands]);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          loadBrands(page + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (lastBrandRef.current) {
      observer.observe(lastBrandRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore, page, loadBrands, brands.length]);

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
        <>
          <Brands brands={brands} />

          <div ref={lastBrandRef} className="w-full h-4" />
        </>
      )}

      {isLoading && brands.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 rounded-full animate-pulse bg-primary/20"></div>
        </div>
      )}
    </div>
  );
}
