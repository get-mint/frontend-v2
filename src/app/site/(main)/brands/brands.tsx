"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils/tailwind";
import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { CurrencySelect } from "@/components/app/currency/currency-select";

const ITEMS_PER_PAGE = 12;

export function Brands() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterCurrency, setFilterCurrency] = useState<Tables<"currencies"> | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setBrands([]);
    setPage(0);
    fetchBrands(0);
  }, [debouncedSearch, filterCurrency]);

  const fetchBrands = async (pageNumber: number) => {
    setLoading(true);

    const supabase = createClient();

    const start = pageNumber * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;

    let query = supabase
      .from("advertisers")
      .select("*", { count: "exact" })
      .order("priority", { ascending: true })
      .eq("active", true);

    if (debouncedSearch) {
      query = query.ilike("name", `%${debouncedSearch}%`);
    }

    if (filterCurrency) {
      query = query.eq("currency_id", filterCurrency.id);
    }

    const { data, count, error } = await query
      .range(start, end)
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching brands:", error);
      setLoading(false);
      return;
    }

    if (data) {
      // No need to de-duplicate since we're no longer joining
      if (pageNumber === 0) {
        setBrands(data);
      } else {
        setBrands((prevBrands) => [...prevBrands, ...data]);
      }

      const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
      setHasMore(pageNumber < totalPages - 1);
      setPage(pageNumber);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBrands(0);
  }, []);

  const lastBrandElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchBrands(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  return (
    <>
      <BlurFade inView delay={0.4} className="flex items-center gap-3 mb-8">
        <div className="relative flex-grow w-full">
          <Search className="absolute w-5 h-5 -translate-y-1/2 text-muted-foreground left-4 top-1/2" />
          <Input
            placeholder="Search for a brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-12 py-6 rounded-full"
          />
        </div>

        <CurrencySelect
          allowAllCurrencies={true}
          onCurrencyChange={setFilterCurrency}
          triggerClassName="w-80 py-6 px-6 rounded-full"
        />
      </BlurFade>

      {loading && brands.length === 0 ? null : brands.length === 0 ? (
        <div className="flex justify-center py-8">No brands found</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          {brands.map((brand, index) => {
            const isLastElement = index === brands.length - 1;

            return (
              <div
                ref={isLastElement ? lastBrandElementRef : null}
                key={`${brand.id}-${index}`}
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
      )}
    </>
  );
}
