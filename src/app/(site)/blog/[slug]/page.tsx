import { Suspense } from "react";
import { Metadata } from "next";

import { fetchPost } from "./data";
import { Post } from "./post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await fetchPost(slug);
  
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

export default async function BlogPostPage({ 
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="max-w-6xl px-6 py-6 mx-auto">
      <Suspense fallback={undefined}>
        <Post slug={slug} />
      </Suspense>
    </div>
  );
}