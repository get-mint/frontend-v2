"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils/tailwind";

import { Tables } from "@/types/supabase";

import { BlurFade } from "@/components/magicui/blur-fade";

export default function BrandsClient({
  initialBrands,
  initialTotalPages,
}: {
  initialBrands: Tables<"advertisers">[];
  initialTotalPages: number;
}) {
  const [brands, setBrands] = useState<Tables<"advertisers">[]>(initialBrands);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialTotalPages > 1);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastBrandElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreBrands();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadMoreBrands = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetch(`/api/brands?page=${nextPage}`);
      const data = await response.json();

      if (data.brands.length > 0) {
        setBrands((prevBrands) => [...prevBrands, ...data.brands]);
        setPage(nextPage);
        setHasMore(nextPage < data.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more brands:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
        {brands.map((brand, index) => {
          const isLastElement = index === brands.length - 1;

          return (
            <div
              ref={isLastElement ? lastBrandElementRef : null}
              key={brand.id}
            >
              <BlurFade delay={0.1 * (index % 4)} inView>
                <Link href={`/brands/${brand.slug}`}>
                  <div
                    className={cn(
                      "p-8 rounded-3xl hover:scale-102 transition-all",
                      !brand.brand_hex_color && "border"
                    )}
                    style={
                      brand.brand_hex_color
                        ? { backgroundColor: brand.brand_hex_color }
                        : undefined
                    }
                  >
                    <img
                      src={brand.image_url || "/images/placeholder.svg"}
                      alt={brand.name}
                      width={512}
                      height={512}
                      className="object-contain w-full aspect-video"
                    />
                  </div>
                </Link>
              </BlurFade>
            </div>
          );
        })}
      </div>
    </>
  );
}
