import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

import { BlurFade } from "@/components/magicui/blur-fade";

const fetchRelatedPostsData = async (postId: string) => {
  const supabase = createAdminClient();

  const { data: relatedPostsIds, error: relatedError } = await supabase
    .from("blog_post_related_blog_posts")
    .select("related_blog_post_id")
    .eq("blog_post_id", postId);

  if (relatedError || !relatedPostsIds.length) {
    const { data: latestPosts, error: latestError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .neq("id", postId)
      .order("published_at", { ascending: false })
      .limit(3);

    if (latestError) {
      console.error("Error fetching latest posts:", latestError);
      return [];
    }

    return latestPosts;
  }

  const relatedIds = relatedPostsIds.map((item) => item.related_blog_post_id);

  const { data: relatedPosts, error: postsError } = await supabase
    .from("blog_posts")
    .select("*")
    .in("id", relatedIds)
    .eq("published", true);

  if (postsError) {
    console.error("Error fetching related posts:", postsError);
    return [];
  }

  return relatedPosts;
};

const fetchRelatedPosts = unstable_cache(
  fetchRelatedPostsData,
  ["related-blog-posts"],
  {
    revalidate: 3600,
    tags: ["blog-posts"],
  }
);

const getPostIdFromSlug = async (slug: string) => {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data.id;
};

export async function RelatedPosts({ slug }: { slug: string }) {
  const postId = await getPostIdFromSlug(slug);

  if (!postId) {
    return null;
  }

  const relatedPosts = await fetchRelatedPosts(postId);

  if (!relatedPosts.length) {
    return (
      <div className="mt-4 text-muted-foreground">
        No related posts available.
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-6">
      {relatedPosts.map((post: Tables<"blog_posts">, index: number) => (
        <BlurFade key={post.id} delay={0.1 * index}>
          <Link href={`/blog/${post.slug}`} className="flex flex-col space-y-2">
            <div className="relative w-full h-32 overflow-hidden rounded-md">
              <Image
                src={post.image_url || "/images/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              {post.created_at &&
                new Date(post.created_at).toLocaleDateString()}
            </p>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
