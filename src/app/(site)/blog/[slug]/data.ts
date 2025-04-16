import { createAdminClient } from "@/lib/supabase/server/client";

export async function fetchPost(slug: string) {
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
}
