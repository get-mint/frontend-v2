import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase/server/client";

const fetchPostData = async (slug: string) => {
  const supabase = createAdminClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !post) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return post;
};

export const fetchPost = unstable_cache(fetchPostData, ["blog-post"], {
  revalidate: 3600,
  tags: ["blog-posts"],
});
