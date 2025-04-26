import type { MetadataRoute } from "next";

import { createAdminClient } from "@/lib/supabase/server/client";

const SITE_URL = "https://mintcashback.com";

async function getBlogPostPaths() {
  const result: MetadataRoute.Sitemap = [];

  const supabase = createAdminClient();

  const { data: blogPosts, error } = await supabase
    .from("blog_posts")
    .select("*");

  if (error) {
    console.error(error);
    return result;
  }

  blogPosts.forEach((blogPost) => {
    result.push({
      url: `${SITE_URL}/blog/${blogPost.slug}`,
      lastModified:
        blogPost.published_at || new Date(blogPost.published_at).toISOString(),
      priority: 0.7,
    });
  });

  return result;
}

async function getBrandPaths() {
  const result: MetadataRoute.Sitemap = [];

  const supabase = createAdminClient();

  const { data: brands, error } = await supabase.from("brands").select("*");

  if (error) {
    console.error(error);
    return result;
  }

  brands.forEach((brand) => {
    result.push({
      url: `${SITE_URL}/brand/${brand.slug}`,
      lastModified: new Date().toISOString(),
      priority: 0.7,
    });
  });

  return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result: MetadataRoute.Sitemap = [];

  const blogPaths = await getBlogPostPaths();
  result.push(...blogPaths);

  const brandPaths = await getBrandPaths();
  result.push(...brandPaths);

  result.push({
    url: SITE_URL,
    lastModified: new Date().toISOString(),
    priority: 1.0,
  });

  const standardPages = [
    "/about",
    "/faq",
    "/terms",
    "/privacy",
    "/blog",
    "/brands",
  ];

  standardPages.forEach((path) => {
    result.push({
      url: `${SITE_URL}${path}`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    });
  });

  return result;
}
