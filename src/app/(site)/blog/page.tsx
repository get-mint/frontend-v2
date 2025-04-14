import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { Suspense } from "react";

import { client } from "@/app/studio/client";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CategoryFilter from "./components/CategoryFilter";
import PostsGrid from "./components/PostsGrid";

// Fetch all categories (Server Component)
async function getCategories() {
  return client.fetch<SanityDocument[]>(
    `
    *[_type == "category"] {
      _id,
      title,
      slug
    }
    `,
    {},
    { next: { revalidate: 30 } }
  );
}

// Fetch posts with optional category filter (Server Component)
async function getPosts(categoryId?: string) {
  const categoryFilter = categoryId
    ? `&& "${categoryId}" in categories[]->_id`
    : "";

  return client.fetch<SanityDocument[]>(
    `
    *[_type == "post" && defined(slug.current) ${categoryFilter}] |
    order(publishedAt desc)[0...12]{
      _id, 
      title, 
      slug, 
      publishedAt, 
      "imageUrl": mainImage.asset->url,
      "authorName": author->name,
      "categories": categories[]->{ _id, title, slug }
    }
    `,
    {},
    { next: { revalidate: 30 } }
  );
}

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoriesPromise = getCategories();
  const postsPromise = getPosts(searchParams.category);

  return (
    <main className="container max-w-6xl min-h-screen p-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold">Posts</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Sidebar with categories */}
        <div className="md:col-span-1">
          <div className="sticky space-y-6 top-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-xl font-semibold">Refine your search</h2>

              <div className="space-y-4">
                <h3 className="font-medium">Categories</h3>
                <Suspense fallback={<div>Loading categories...</div>}>
                  <CategoryFilter 
                    categories={await categoriesPromise} 
                    selectedCategoryId={searchParams.category} 
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Main content with posts */}
        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading posts...</div>}>
            <PostsGrid posts={await postsPromise} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
