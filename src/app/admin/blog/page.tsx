"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tables } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Tables<"blog_posts">[]>([]);

  const fetchPosts = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <Button onClick={() => router.push("/admin/blog/create")} size="lg">
          <PlusIcon className="h-5 w-5" />
          Create Blog Post
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post: Tables<"blog_posts">, index: number) => (
          <BlurFade delay={0.25 * index} key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="space-y-3 cursor-pointer"
            >
              <Image
                src={post.image_url || "/images/placeholder.svg"}
                alt={post.title}
                width={512}
                height={512}
                className="object-contain w-full border rounded-xl aspect-square"
              />

              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="font-semibold text-md text-muted-foreground">
                  {post.published_at &&
                    new Date(post.published_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
