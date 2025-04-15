import Image from "next/image";
import Link from "next/link";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

async function fetchPosts() {
  const supabase = createAdminClient();
  
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(12);
    
  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
  
  return posts;
}

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div className="grid grid-cols-1 gap-6 cursor-pointer md:grid-cols-3">
      {posts.map((post: Tables<"blog_posts">) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.id}
          className="space-y-3"
        >
          <Image
            src={post.content && typeof post.content === 'object' && 'imageUrl' in post.content 
              ? (post.content.imageUrl as string) 
              : "/images/placeholder.svg"}
            alt={post.title}
            width={512}
            height={512}
            className="object-contain w-full border rounded-xl aspect-square"
          />

          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="font-semibold text-md text-muted-foreground">
              {post.published_at &&
                new Date(post.published_at).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
