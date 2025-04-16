import { createElement, Fragment, JSX } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchPost } from "./data";

function renderNode(node: any, index?: number): JSX.Element | null {
  if (!node) return null;

  switch (node.type) {
    case "heading":
      const level = node.attrs?.level || 1;
      return createElement(
        `h${level}`,
        { key: node.id || `heading-${index}` },
        node.content?.map((child: any, i: number) => renderNode(child, i))
      );
    case "paragraph":
      return (
        <p key={node.id || `paragraph-${index}`}>
          {node.content?.map((child: any, i: number) => renderNode(child, i))}
        </p>
      );
    case "text":
      return <Fragment key={node.id || `text-${index}`}>{node.text}</Fragment>;
    case "bulletList":
      return (
        <ul key={node.id || `bulletList-${index}`}>
          {node.content?.map((child: any, i: number) => renderNode(child, i))}
        </ul>
      );
    case "listItem":
      return (
        <li key={node.id || `listItem-${index}`}>
          {node.content?.map((child: any, i: number) => renderNode(child, i))}
        </li>
      );
    case "blockquote":
      return (
        <blockquote key={node.id || `blockquote-${index}`}>
          {node.content?.map((child: any, i: number) => renderNode(child, i))}
        </blockquote>
      );
    default:
      return null;
  }
}

export async function Post({ slug }: { slug: string }) {
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const content = (post.content as Record<string, unknown>) || {};
  const imageUrl = (content.imageUrl as string) || null;

  return (
    <article
      className="prose prose-lg prose-slate max-w-none"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <h1 className="text-3xl font-bold" itemProp="headline">
        {post.title}
      </h1>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-auto mt-4 rounded-xl"
        />
      )}

      <div className="mt-6 prose" itemProp="articleBody">
        {post.content.content.map((node: any, index: number) =>
          renderNode(node, index)
        )}
      </div>
    </article>
  );
}
