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
import { ArrowLeft, ArrowLeftIcon } from 'lucide-react';
import { PreviewDialog } from "../../preview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [blogPost, setBlogPost] = useState<Tables<"blog_posts"> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [relatedPosts, setRelatedPosts] = useState<string[]>([]);
  const [availablePosts, setAvailablePosts] = useState<Tables<"blog_posts">[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

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

      // Fetch related posts
      const { data: relatedPostsData, error: relatedPostsError } = await supabase
        .from("blog_post_related_blog_posts")
        .select("related_blog_post_id")
        .eq("blog_post_id", id);

      if (relatedPostsError) {
        console.error(relatedPostsError);
      } else {
        setRelatedPosts(relatedPostsData?.map(rp => rp.related_blog_post_id) || []);
      }
    }

    fetchBlogPost();
  }, [id]);

  useEffect(() => {
    const fetchAvailablePosts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setAvailablePosts(data || []);
    };

    fetchAvailablePosts();
  }, []);

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

  const handleRelatedPostSelect = (postId: string) => {
    if (!relatedPosts.includes(postId)) {
      setRelatedPosts(prev => [...prev, postId]);
    }
    setSelectedValue(""); // Reset the select value
  };

  const handleRemoveRelatedPost = (postId: string) => {
    setRelatedPosts(prev => prev.filter(id => id !== postId));
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

    // Update related posts
    // First, delete all existing related posts
    const { error: deleteError } = await supabase
      .from('blog_post_related_blog_posts')
      .delete()
      .eq('blog_post_id', blogPost.id);

    if (deleteError) {
      console.error(deleteError);
      toast.error('Failed to update related posts');
      return;
    }

    // Then insert the new related posts
    if (relatedPosts.length > 0) {
      const { error: insertError } = await supabase
        .from('blog_post_related_blog_posts')
        .insert(
          relatedPosts.map(postId => ({
            related_blog_post_id: postId,
            blog_post_id: blogPost.id,
          }))
        );

      if (insertError) {
        console.error(insertError);
        toast.error('Failed to update related posts');
        return;
      }
    }

    toast.success('Blog post saved successfully');
    router.push('/admin/blog');
  };

  useEffect(() => {
    console.log(relatedPosts);
  }, [relatedPosts]);

  return (
    <div>
      <div className="flex p-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
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
        <div className="space-y-2">
          <label className="text-sm font-medium">Related Posts</label>
          <Select value={selectedValue} onValueChange={handleRelatedPostSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select related posts" />
            </SelectTrigger>
            <SelectContent>
              {availablePosts
                .filter(post => post.id !== blogPost?.id) // Exclude current post
                .map((post) => (
                  <SelectItem key={post.id} value={post.id}>
                    {post.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {relatedPosts.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Selected posts:</p>
              <ul className="mt-1 space-y-1">
                {relatedPosts.map((postId) => {
                  const post = availablePosts.find(p => p.id === postId);
                  return post ? (
                    <li key={postId} className="text-sm flex items-center justify-between">
                      <span>{post.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleRemoveRelatedPost(postId)}
                      >
                        ×
                      </Button>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="prose max-w-none min-h-[200px] p-4"
        />
      </div>
      <div className="flex justify-end p-4 gap-2">
        <PreviewDialog
          title={title}
          imageUrl={uploadedImageUrl}
          content={editor?.getJSON() || { content: [] }}
          relatedPosts={availablePosts.filter(post => relatedPosts.includes(post.id))}
        />
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}