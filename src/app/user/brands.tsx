"use client";

import Link from "next/link";

import { ExternalLinkIcon } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";

import { Tables } from "@/types/supabase";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function BrandsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="relative aspect-square">
            <Skeleton className="w-full h-full rounded-xl" />
            <Skeleton className="absolute w-16 h-8 rounded-md bottom-2 right-2" />
          </div>
          <div className="flex flex-col gap-0.5">
            <Skeleton className="w-3/4 h-6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Brands({ brands }: { brands: Tables<"brands">[] }) {
  const { authUser } = useAuth();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {brands.map((brand, index) => (
        <div
          key={`${brand.id}-${index}`}
          className="flex flex-col gap-2 transition-all group"
        >
          <div
            className={`relative aspect-square flex items-center justify-center p-6 rounded-xl overflow-hidden group-hover:shadow-md transition-shadow ${
              !brand.color ? "bg-muted" : ""
            }`}
            style={{ backgroundColor: brand.color || undefined }}
          >
            <Link
              href={`/user/brands/${brand.slug}`}
              className="absolute inset-0"
            />
            <img
              src={brand.image_url ?? "/placeholder.svg"}
              alt={brand.name}
              className="object-contain max-w-full max-h-full"
              width={120}
              height={120}
            />
            <Link
              href={`/launch?domain=${brand.domain}&email=${authUser?.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="absolute h-8 text-sm bottom-2 right-2"
                variant="ghost"
              >
                Shop
                <ExternalLinkIcon className="size-4" />
              </Button>
            </Link>
          </div>

          <Link
            href={`/user/brands/${brand.slug}`}
            className="flex flex-col gap-0.5"
          >
            <div className="text-lg font-bold transition-all group-hover:underline">
              {brand.name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
