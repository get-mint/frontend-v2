import Image from "next/image";
import Link from "next/link";
import { SanityDocument } from "next-sanity";

import { client } from "@/app/studio/client";

async function fetchPosts() {
  return client.fetch<SanityDocument[]>(
    `
    *[_type == "post" && defined(slug.current)] |
    order(publishedAt desc)[0...12]{
      _id, 
      title, 
      slug, 
      publishedAt, 
      "imageUrl": mainImage.asset->url,
      "authorName": author->name,
      "categories": categories[]->{ _id, title, slug }
    }
    `,
    {},
    { next: { revalidate: 30 } }
  );
}

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div className="grid grid-cols-1 gap-6 cursor-pointer md:grid-cols-3">
      {posts.map((post) => (
        <Link
          href={`/blog/${post.slug.current}`}
          key={post._id}
          className="space-y-3"
        >
          <Image
            src={post.imageUrl ? post.imageUrl : "/images/placeholder.svg"}
            alt={post.title}
            width={512}
            height={512}
            className="object-contain w-full border rounded-xl aspect-square"
          />

          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="font-semibold text-md text-muted-foreground">
              {post.publishedAt &&
                new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
