"use client";

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables } from "@/types/supabase";
import { PreviewDialog } from "../preview";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-primary text-white' : ''
          }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-primary text-white' : ''
          }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('strike') ? 'bg-primary text-white' : ''
          }`}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('code') ? 'bg-primary text-white' : ''
          }`}
      >
        Code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="px-3 py-1.5 rounded-md hover:bg-gray-100"
      >
        Clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="px-3 py-1.5 rounded-md hover:bg-gray-100"
      >
        Clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('paragraph') ? 'bg-primary text-white' : ''
          }`}
      >
        Paragraph
      </button>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <button
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('heading', { level }) ? 'bg-primary text-white' : ''
            }`}
        >
          H{level}
        </button>
      ))}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-primary text-white' : ''
          }`}
      >
        Bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-primary text-white' : ''
          }`}
      >
        Ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('codeBlock') ? 'bg-primary text-white' : ''
          }`}
      >
        Code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-primary text-white' : ''
          }`}
      >
        Blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('horizontalRule') ? 'bg-primary text-white' : ''
          }`}
      >
        Horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('hardBreak') ? 'bg-primary text-white' : ''
          }`}
      >
        Hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('undo') ? 'bg-primary text-white' : ''
          }`}
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('redo') ? 'bg-primary text-white' : ''
          }`}
      >
        Redo
      </button>
    </div>
  );
};

export default function CreateBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<number[]>([]);
  const [availablePosts, setAvailablePosts] = useState<Tables<"blog_posts">[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
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

    fetchPosts();
  }, []);

  const handleRelatedPostSelect = (postId: string) => {
    const numericId = parseInt(postId, 10);
    if (!isNaN(numericId) && !relatedPosts.includes(numericId)) {
      setRelatedPosts(prev => [...prev, numericId]);
    }
    setSelectedValue(""); // Reset the select value
  };

  const handleRemoveRelatedPost = (postId: number) => {
    setRelatedPosts(prev => prev.filter(id => id !== postId));
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[200px] p-4 focus:outline-none',
      },
    },
  });

  const handleSubmit = async () => {
    if (!editor) return;
    setIsLoading(true);

    try {
      const supabase = createClient();
      const content = editor.getJSON();
      
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove any non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      // Insert the blog post
      const { data: newPost, error: newPostError } = await supabase
        .from('blog_posts')
        .insert({
          title: title,
          slug: slug,
          body: content,
        })
        .select()
        .single();

      if (newPostError) {
        console.error(newPostError);
        toast.error('Failed to create blog post');
        return;
      }

      // Handle related posts if we have any
      if (relatedPosts.length > 0 && newPost) {
        const { error } = await supabase
          .from('blog_posts_categories')
          .insert(
            relatedPosts.map(postId => ({
              blog_post_category_id: postId,
              blog_post_id: newPost.id,
            }))
          );

        if (error) {
          console.error(error);
          toast.error('Failed to add categories');
        }
      }

      toast.success('Blog post created successfully');
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSaveDraft = async () => {
    // Similar to handleSubmit but with draft status
    // Implement if needed
    toast.info('Draft saving not implemented yet');
  }

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

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Create New Blog Post</h1>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold">Title</h2>
            <Input
              placeholder="Enter blog post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              asChild
              disabled={isUploading}
              size="sm"
            >
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {isUploading ? 'Uploading...' : 'Upload Featured Image'}
              </label>
            </Button>
          </div>
          
          {uploadedImageUrl && (
            <div>
              <div className="flex items-center justify-center w-full max-w-2xl">
                <img
                  src={uploadedImageUrl}
                  alt="Blog post featured image"
                  className="object-contain max-h-60"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setUploadedImageUrl(null)}
              >
                Remove Image
              </Button>
            </div>
          )}
          
          <div>
            <h2 className="text-sm font-semibold">Related Posts (Categories)</h2>
            <div className="flex flex-col gap-2">
              <Select
                value={selectedValue}
                onValueChange={handleRelatedPostSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {availablePosts.map((post) => (
                    <SelectItem key={post.id} value={post.id.toString()}>
                      {post.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {relatedPosts.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {relatedPosts.map((postId) => {
                    const post = availablePosts.find((p) => p.id === postId);
                    return (
                      <div
                        key={postId}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md"
                      >
                        <span>{post?.title || `Post ${postId}`}</span>
                        <button
                          className="text-red-500"
                          onClick={() => handleRemoveRelatedPost(postId)}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-semibold">Content</h2>
            <div className="overflow-hidden border rounded-md">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Post'}
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} disabled={isLoading}>
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
