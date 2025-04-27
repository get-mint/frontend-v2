import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";
import { BlurFade } from "@/components/magicui/blur-fade";

const fetchPostsData = async () => {
  const supabase = createAdminClient();

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return posts;
};

const fetchPosts = unstable_cache(fetchPostsData, ["blog-posts-list"], {
  revalidate: 3600,
  tags: ["blog-posts"],
});

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {posts.map((post: Tables<"blog_posts">, index: number) => (
        <BlurFade delay={0.1 * index} key={post.id}>
          <Link
            href={`/blog/${post.slug}`}
            className="space-y-3 cursor-pointer"
          >
            <Image
              src={post.image_url || "/images/placeholder.svg"}
              alt={post.title}
              width={512}
              height={512}
              className="object-contain w-full border rounded-xl aspect-square"
            />

            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="font-semibold text-md text-muted-foreground">
                {post.created_at &&
                  new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
