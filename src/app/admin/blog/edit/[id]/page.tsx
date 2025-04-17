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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');

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
      setUploadedImageUrl(data?.[0]?.image_url || null);
      setTitle(data?.[0]?.title || '');
    }

    fetchBlogPost();
  }, [id]);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(blogPost?.content as Record<string, any> || '');
    }
  }, [editor, blogPost]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setIsUploading(true);
    const supabase = createClient();

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('blog-post-images')
        .upload(fileName, file);

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-post-images')
        .getPublicUrl(fileName);

      setUploadedImageUrl(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!editor || !blogPost) return;

    const supabase = createClient();
    const content = editor.getJSON();

    const { error } = await supabase
      .from('blog_posts')
      .update({
        title: title,
        content: content,
        image_url: uploadedImageUrl,
      })
      .eq('id', blogPost.id);

    if (error) {
      console.error(error);
      toast.error('Failed to save blog post');
      return;
    }

    toast.success('Blog post saved successfully');
    router.push('/admin/blog');
  };

  return (
    <div>
      <div className="flex p-4">
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold">Title</h2>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              asChild
              disabled={isUploading}
            >
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </label>
            </Button>
          </div>
          {uploadedImageUrl && (
            <div>
              <div className="flex justify-center items-center w-full max-w-2xl">
                <img
                  src={uploadedImageUrl}
                  alt="Blog post cover"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div className="flex p-2 pt-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setUploadedImageUrl(null)}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="prose max-w-none min-h-[200px] p-4"
        />
      </div>
      <div className="flex justify-end p-4">
        <Button>
          Preview
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}