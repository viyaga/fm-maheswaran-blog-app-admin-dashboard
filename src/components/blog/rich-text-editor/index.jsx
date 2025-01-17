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
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    immediatelyRender: false,
    // shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
   <div className="prose max-w-full">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default RichTextEditor;