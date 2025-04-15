const { createClient } = require("next-sanity");

// Sanity client to fetch blog data
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w1vyolig",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Create Supabase admin client
const { createClient: createSupabaseClient } = require("@supabase/supabase-js");

// Supabase client to fetch brands data
const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

module.exports = {
  siteUrl: "https://www.mintcashback.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  sitemapSize: 7000,
  // Add additional paths
  additionalPaths: async (config) => {
    const result = [];

    // Fetch blog posts from Sanity
    const posts = await client.fetch(`
      *[_type == "post" && defined(slug.current)]{
        "slug": slug.current,
        publishedAt
      }
    `);

    // Add blog posts to sitemap
    posts.forEach((post) => {
      result.push({
        loc: `${config.siteUrl}/blog/${post.slug}`,
        changefreq: "weekly",
        priority: 0.7,
        lastmod: post.publishedAt || new Date().toISOString(),
      });
    });

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
      .select("id, updated_at")
      .eq("active", true);

    // Add brands to sitemap
    if (brands && brands.length > 0) {
      brands.forEach((brand) => {
        result.push({
          loc: `${config.siteUrl}/brands/${brand.id}`,
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
