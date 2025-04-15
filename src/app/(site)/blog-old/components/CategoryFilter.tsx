"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type SanityDocument } from "next-sanity";

interface CategoryFilterProps {
  categories: SanityDocument[];
  selectedCategoryId?: string;
}

export default function CategoryFilter({
  categories,
  selectedCategoryId,
}: CategoryFilterProps) {
  return (
    <>
      <div className="space-y-2">
        {categories.map((category) => (
          <div className="flex items-center" key={category._id}>
            <Link
              href={`/blog?category=${category._id}`}
              className={`py-1 hover:text-primary ${
                selectedCategoryId === category._id
                  ? "font-bold text-primary"
                  : ""
              }`}
            >
              {category.title}
            </Link>
          </div>
        ))}
      </div>

      {selectedCategoryId && (
        <div className="mt-4">
          <Link href="/blog">
            <Button variant="outline" size="sm">
              Clear filters
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
