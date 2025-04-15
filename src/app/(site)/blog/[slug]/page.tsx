import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { createAdminClient } from "@/lib/supabase/server/client";

async function fetchPost(slug: string) {
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

/*
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  
  if (!post) {
    return {
      title: "Mint Cashback | Post Not Found",
      description: "The requested blog post could not be found",
    };
  }
  
  // Extract common properties from post content
  const content = post.content as Record<string, unknown> || {};
  const excerpt = (content.excerpt as string) || "Read this blog post";
  const imageUrl = content.imageUrl as string || null;
  const author = (content.author as string) || "Mint Team";
  
  // Create structured metadata
  return {
    title: `Mint Cashback | ${post.title}`,
    description: excerpt,
    
    // OpenGraph metadata
    openGraph: {
      type: "article",
      title: post.title,
      description: excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
    
    // Canonical URL
    alternates: {
      canonical: `https://mintcashback.com/blog/${post.slug}`,
    },
    
    // Structured data for SEO
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: excerpt,
        image: imageUrl,
        url: `https://mintcashback.com/blog/${post.slug}`,
        datePublished: post.published_at,
        author: {
          "@type": "Person",
          name: author,
        },
      }),
    },
  };
}
  */

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  const content = post.content as Record<string, unknown> || {};
  const htmlContent = (content.html as string) || '';
  const imageUrl = content.imageUrl as string || null;

  return (
    <div className="px-6 py-6 mx-auto max-w-7xl">
      <article
        className="prose"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <h1 className="text-3xl font-bold">{post.title}</h1>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto mt-4 rounded-xl"
          />
        )}

        <div
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="prose prose-lg prose-slate max-w-none"
        />
      </article>
    </div>
  );
}
