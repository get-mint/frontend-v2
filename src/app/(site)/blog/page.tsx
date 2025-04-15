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

// Define proper page props type for Next.js pages - using the standard Next.js type format
type SearchParams = { [key: string]: string | string[] | undefined };

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const reseolvedSearchParmas = await searchParams; 
  const categoriesPromise = getCategories();
  const postsPromise = getPosts(
    reseolvedSearchParmas.category as string | undefined
  );

  return (
    <main className="container max-w-5xl min-h-screen p-8 mx-auto">
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
                    selectedCategoryId={reseolvedSearchParmas.category as string | undefined} 
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Main content with posts */}
        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading posts...</div>}>
            <PostsList posts={await postsPromise} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

// Inline PostsList component to avoid import issues
function PostsList({ posts }: { posts: SanityDocument[] }) {
  return (
    <ul className="flex flex-col gap-y-6">
      {posts.map((post) => (
        <li key={post._id}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            {post.imageUrl && (
              <div className="p-4 pt-6">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="object-contain w-full h-auto rounded-md"
                />
              </div>
            )}
            <CardContent>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                {post.authorName && <span>By {post.authorName}</span>}
                {post.authorName && post.publishedAt && (
                  <Separator orientation="vertical" className="h-4" />
                )}
                {post.publishedAt && (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.categories.map((category: any) => (
                    <Badge key={category._id} variant="outline">
                      {category.title}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${post.slug.current}`}>
                <Button>Read more</Button>
              </Link>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
