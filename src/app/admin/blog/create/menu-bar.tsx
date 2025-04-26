import { Editor } from "@tiptap/core";

export function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("bold") ? "bg-primary text-white" : ""
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("italic") ? "bg-primary text-white" : ""
        }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("strike") ? "bg-primary text-white" : ""
        }`}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("code") ? "bg-primary text-white" : ""
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
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("paragraph") ? "bg-primary text-white" : ""
        }`}
      >
        Paragraph
      </button>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <button
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
            editor.isActive("heading", { level }) ? "bg-primary text-white" : ""
          }`}
        >
          H{level}
        </button>
      ))}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("bulletList") ? "bg-primary text-white" : ""
        }`}
      >
        Bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("orderedList") ? "bg-primary text-white" : ""
        }`}
      >
        Ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("codeBlock") ? "bg-primary text-white" : ""
        }`}
      >
        Code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("blockquote") ? "bg-primary text-white" : ""
        }`}
      >
        Blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("horizontalRule") ? "bg-primary text-white" : ""
        }`}
      >
        Horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("hardBreak") ? "bg-primary text-white" : ""
        }`}
      >
        Hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("undo") ? "bg-primary text-white" : ""
        }`}
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={`px-3 py-1.5 rounded-md hover:bg-gray-100 ${
          editor.isActive("redo") ? "bg-primary text-white" : ""
        }`}
      >
        Redo
      </button>
    </div>
  );
}
