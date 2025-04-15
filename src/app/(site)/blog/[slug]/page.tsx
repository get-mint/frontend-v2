import Image from "next/image";
import { SanityDocument } from "next-sanity";
import { toHTML } from "@portabletext/to-html";

import { client } from "@/app/studio/client";

async function fetchPost(slug: string) {
  return client.fetch<SanityDocument>(
    `*[_type == "post" && slug.current == $slug][0]{
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
}`,
    { slug }
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  const htmlContent = toHTML(post.body);

  return (
    <div className="px-6 py-6 mx-auto max-w-7xl">
      <article
        className="prose"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <h1 className="text-3xl font-bold">{post.title}</h1>

        {post.mainImage && (
          <Image
            src={post.mainImage}
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
