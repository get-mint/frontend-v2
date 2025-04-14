import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PortableText, type SanityDocument } from "next-sanity";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/app/studio/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  "mainImage": mainImage.asset->url,
  "author": author->{
    name,
    "image": image.asset->url,
    bio
  },
  "categories": categories[]->{ _id, title }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : null;

  return {
    title: post.title,
    description: post.excerpt || "Read this blog post",
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || "Read this blog post",
      images: postImageUrl ? [postImageUrl] : [],
    },
    alternates: {
      canonical: `https://mintcashback.com/blog/${post.slug.current}`,
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt || "Read this blog post",
        image: postImageUrl,
        url: `https://mintcashback.com/blog/${post.slug.current}`,
        datePublished: post.publishedAt,
        author: {
          "@type": "Person",
          name: post.author?.name || "Mint Team",
        },
      }),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );

  return (
    <main className="container max-w-6xl min-h-screen p-8 mx-auto" role="main">
      <Link href="/blog">
        <Button variant="ghost" className="gap-2 mb-6">
          <ArrowLeft size={16} />
          Back to posts
        </Button>
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <article
          className="prose md:col-span-3 max-w-none"
          itemScope
          itemType="http://schema.org/BlogPosting"
        >
          {post.mainImage && (
            <div className="w-full mb-8 non-prose">
              <Image
                src={post.mainImage}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded-xl object-cover max-h-[500px]"
                priority
              />
            </div>
          )}

          <h1 itemProp="headline" className="mb-4 text-4xl font-bold">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            {post.categories && post.categories.length > 0 && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span>
                  Categories:{" "}
                  {post.categories.map((cat: any) => cat.title).join(", ")}
                </span>
              </>
            )}
          </div>

          <div itemProp="articleBody">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
        </article>

        <aside className="space-y-6 md:col-span-1">
          <div className="sticky space-y-6 top-8">
            {/* Author card */}
            <div className="p-6 rounded-lg bg-muted/30">
              <h2 className="mb-4 text-lg font-semibold">About the Author</h2>

              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  {post.author?.image ? (
                    <AvatarImage
                      src={post.author.image}
                      alt={post.author?.name || "Author"}
                    />
                  ) : (
                    <AvatarFallback>
                      {post.author?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h3 className="font-medium">
                  {post.author?.name || "Mint Team"}
                </h3>
              </div>

              {post.author?.bio && (
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              )}
            </div>
            
            {/* Call to action card */}
            <div className="p-6 border border-green-100 rounded-lg shadow-sm bg-gradient-to-br from-green-50 to-teal-50">
              <h3 className="mb-2 font-semibold text-green-800">
                Have you installed Mint yet?
              </h3>
              <p className="mb-4 text-sm text-green-700">
                Get automatic cashback on your purchases and start saving
                today!
              </p>
              <Link href="/download">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Install Mint Now
                </Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
