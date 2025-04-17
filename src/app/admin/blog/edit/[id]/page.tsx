"use client";

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/types/supabase";

import { MenuBar } from "@/app/admin/blog/create/page";
import { ArrowLeftIcon } from 'lucide-react';

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [blogPost, setBlogPost] = useState<Tables<"blog_posts"> | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: blogPost?.content as Record<string, any> || '',
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*").eq("id", id);

      if (error) {
        console.error(error);
      }

      setBlogPost(data?.[0]);
    }

    fetchBlogPost();
  }, [id]);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(blogPost?.content as Record<string, any> || '');
    }
  }, [editor, blogPost]);



  return (
    <div>
      <div className="flex p-4">
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
      </div>
      <div className="p-4">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="prose max-w-none min-h-[200px] p-4"
        />
      </div>
      <div className="flex p-4">
        <Button>
          Save
        </Button>
      </div>
    </div>
  );
}