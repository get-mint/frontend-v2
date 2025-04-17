"use client";

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/client";
import { Input } from '@/components/ui/input';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
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

    const supabase = createClient();

    const content = editor.getJSON();
    console.log(content.content);

    const slug = title.toLowerCase().replace(/ /g, '-');

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: title,
        slug: slug,
        content: content,
        published: true,
        published_at: new Date(),
        created_at: new Date(),
      });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
    router.push('/admin/blog');
  }

  const handleSaveDraft = async () => {
    if (!editor) return;

    const supabase = createClient();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Create Blog Post</h1>
      </div>
      <div>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="border rounded-lg">
        <div>
          <MenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className="prose max-w-none min-h-[200px] p-4"
          />
        </div>
      </div>
      <div className="flex gap-4 flex-row justify-end p-4">
        <Button onClick={handleSaveDraft}>Save Draft</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
