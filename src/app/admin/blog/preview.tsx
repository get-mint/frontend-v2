"use client";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";
import { Tables } from "@/types/supabase";
import { createElement, Fragment, JSX } from "react";

interface PreviewDialogProps {
  title: string;
  imageUrl: string | null;
  content: any;
  relatedPosts: Tables<"blog_posts">[];
}

export function PreviewDialog({ title, imageUrl, content, relatedPosts }: PreviewDialogProps) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Preview</Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] h-[90vh] overflow-y-auto">
        <DialogTitle>Blog Post Preview</DialogTitle>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{title}</h1>
          {imageUrl && (
            <div className="relative w-full aspect-video">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div className="prose max-w-none">
              {content.content?.map((node: any, index: number) => renderNode(node, index))}
            </div>
            {relatedPosts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Related Posts</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <div key={post.id} className="space-y-2">
                      {post.image_url && (
                        <div className="relative w-full aspect-video">
                          <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
