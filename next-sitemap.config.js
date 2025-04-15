const { createClient: createSupabaseClient } = require("@supabase/supabase-js");

const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

module.exports = {
  siteUrl: "https://www.mintcashback.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const result = [];

    // Fetch blog posts from Supabase
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, published_at, updated_at")
      .eq("published", true);

    if (error) {
      console.error("Error fetching blog posts for sitemap:", error);
    }

    // Add blog posts to sitemap
    if (posts && posts.length > 0) {
      posts.forEach((post) => {
        result.push({
          loc: `${config.siteUrl}/blog/${post.slug}`,
          changefreq: "weekly",
          priority: 0.7,
          lastmod:
            post.updated_at || post.published_at || new Date().toISOString(),
        });
      });
    }

    // Add the main blog index page
    result.push({
      loc: `${config.siteUrl}/blog`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    // Fetch brands from Supabase
    const { data: brands } = await supabase
      .from("advertisers")
      .select("slug, updated_at")
      .eq("active", true);

    // Add brands to sitemap
    if (brands && brands.length > 0) {
      brands.forEach((brand) => {
        result.push({
          loc: `${config.siteUrl}/brands/${brand.slug}`,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: brand.updated_at || new Date().toISOString(),
        });
      });

      // Add the main brands index page
      result.push({
        loc: `${config.siteUrl}/brands`,
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }

    return result;
  },
};
