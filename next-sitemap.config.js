const { createClient: createSupabaseClient } = require("@supabase/supabase-js");

const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

async function getBlogPostPaths(siteUrl) {
  const result = [];

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, published_at")
    .eq("published", true);

  if (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return result;
  }

  if (posts && posts.length > 0) {
    posts.forEach((post) => {
      result.push({
        loc: `${siteUrl}/blog/${post.slug}`,
        changefreq: "weekly",
        priority: 0.7,
        lastmod: post.published_at || new Date().toISOString(),
      });
    });
  }

  result.push({
    loc: `${siteUrl}/blog`,
    changefreq: "daily",
    priority: 0.8,
    lastmod: new Date().toISOString(),
  });

  return result;
}

async function getBrandPaths(siteUrl) {
  const result = [];

  const { data: brands, error } = await supabase
    .from("advertisers")
    .select("slug, updated_at")
    .eq("active", true);

  if (error) {
    console.error("Error fetching brands for sitemap:", error);
    return result;
  }

  if (brands && brands.length > 0) {
    brands.forEach((brand) => {
      result.push({
        loc: `${siteUrl}/brands/${brand.slug}`,
        changefreq: "weekly",
        priority: 0.7,
        lastmod: brand.updated_at || new Date().toISOString(),
      });
    });

    result.push({
      loc: `${siteUrl}/brands`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });
  }

  return result;
}

module.exports = {
  siteUrl: "https://www.mintcashback.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const blogPaths = await getBlogPostPaths(config.siteUrl);
    const brandPaths = await getBrandPaths(config.siteUrl);

    return [...blogPaths, ...brandPaths];
  },
};
