"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import extensions from "./extensions";
import Toolbar from "./toolbar";

const RichTextEditor = ({ onChange, content }) => {

  const handleChange = (newContent) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: extensions,
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border border-border text-foreground bg-background items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-md outline-none focus:border-primary transition"
      },
    },
    immediatelyRender: false,
    // shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="prose prose-lg prose-slate dark:prose-invert mx-auto my-8 max-w-full">
      <Toolbar editor={editor} />
      <EditorContent className="blog-content" style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default RichTextEditor;