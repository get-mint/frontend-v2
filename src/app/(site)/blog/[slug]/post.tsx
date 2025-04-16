import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchPost } from "./data";

export async function Post({ slug }: { slug: string }) {
  const post = await fetchPost(slug);

  const content = (post.content as Record<string, unknown>) || {};
  const htmlContent = (content.html as string) || "";
  const imageUrl = (content.imageUrl as string) || null;

  if (!post) {
    notFound();
  }

  return (
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
  );
}
