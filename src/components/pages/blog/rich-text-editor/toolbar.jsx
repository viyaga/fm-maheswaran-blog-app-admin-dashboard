"use client";

import React from "react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading1,
  Heading3,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Highlighter as HighlightIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Check,
  VideoIcon,
  PencilLine,
  Palette,
  Music,           // For Audio embed
  AlertTriangle,   // For Callout block
} from "lucide-react";

// Custom icons for Superscript and Subscript
const SuperscriptIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <text x="4" y="16" fontSize="16" fontWeight="bold">x²</text>
  </svg>
);

const SubscriptIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <text x="4" y="18" fontSize="16" fontWeight="bold">x₂</text>
  </svg>
);

function isYouTubeURL(url) {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|live\/|playlist\?list=|)([a-zA-Z0-9_-]{11,})/;
  return regex.test(url);
}

// Helper function to convert YouTube URL to embed format
function convertToEmbedUrl(url) {
  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = new URL(url).searchParams.get("v");
  } else if (url.includes("live/")) {
    videoId = url.split("live/")[1].split("?")[0];
  }
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      label: "Bold",
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      label: "Italic",
    },
    {
      icon: Underline,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      label: "Underline",
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      label: "Strikethrough",
    },
    // {
    //   icon: SuperscriptIcon,
    //   action: () => editor.chain().focus().toggleSuperscript().run(),
    //   isActive: editor.isActive("superscript"),
    //   label: "Superscript",
    // },
    // {
    //   icon: SubscriptIcon,
    //   action: () => editor.chain().focus().toggleSubscript().run(),
    //   isActive: editor.isActive("subscript"),
    //   label: "Subscript",
    // },
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      label: "Heading 1",
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      label: "Heading 2",
    },
    {
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      label: "Heading 3",
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      label: "Bullet List",
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      label: "Ordered List",
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      label: "Blockquote",
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
      label: "Code Block",
    },
    {
      icon: ImageIcon,
      action: () => {
        const url = prompt("Enter image URL");
        if (url) editor.chain().focus().setImage({ src: url }).run();
      },
      isActive: false,
      label: "Insert Image",
    },
    {
      icon: LinkIcon,
      action: () => {
        const url = prompt("Enter link URL");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
      isActive: editor.isActive("link"),
      label: "Insert Link",
    },
    {
      icon: HighlightIcon,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive("highlight"),
      label: "Highlight",
    },
    {
      icon: VideoIcon, action: () => {
        const url = prompt("Enter YouTube video URL:");
        if (url && isYouTubeURL(url)) {
          const embedUrl = convertToEmbedUrl(url);
          if (!embedUrl) {
            alert("Invalid YouTube URL format.");
            return;
          }
          const iframe = `
          <iframe width="100%" height="100%" 
          src="${embedUrl}" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen></iframe>`
          editor.chain().focus().insertContent(iframe).run();
        } else {
          alert("Please enter a valid YouTube URL.");
        }
      },
      isActive: false,
      label: "Insert Video"
    },
    {
      icon: Music,
      action: () => {
        const url = prompt("Enter audio URL (MP3, etc.):");
        if (url) {
          const audioHTML = `<div class="my-4"><audio controls class="w-full"><source src="${url}" type="audio/mpeg">Your browser does not support the audio element.</audio></div>`;
          editor.chain().focus().insertContent(audioHTML).run();
        }
      },
      isActive: false,
      label: "Insert Audio",
    },
    // {
    //   icon: AlertTriangle,
    //   action: () => {
    //     // Inserts a callout block. Customize the HTML and classes as needed.
    //     const calloutHTML = `<div class="my-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md"><strong>Note:</strong> Your callout content here...</div>`;
    //     editor.chain().focus().insertContent(calloutHTML).run();
    //   },
    //   isActive: false,
    //   label: "Callout",
    // },
    // {
    //   icon: PencilLine,
    //   action: () => editor.chain().focus().setHorizontalRule().run(),
    //   isActive: false,
    //   label: "Horizontal Rule",
    // },
    // {
    //   icon: Palette,
    //   action: () => {
    //     const color = prompt("Enter text color (e.g., #ff0000 or red):");
    //     if (color) editor.chain().focus().setColor(color).run();
    //   },
    //   isActive: false,
    //   label: "Text Color",
    // },
    {
      icon: AlignLeft,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      label: "Align Left",
    },
    {
      icon: AlignCenter,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
      label: "Align Center",
    },
    {
      icon: AlignRight,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
      label: "Align Right",
    },
    {
      icon: AlignJustify,
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: editor.isActive({ textAlign: "justify" }),
      label: "Align Justify",
    },
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      label: "Undo",
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      label: "Redo",
    },
  ];

  return (
    <div className="px-4 py-3 rounded-md flex flex-wrap gap-3 border border-gray-700 bg-gray-900 text-white">
      {buttons.map(({ icon: Icon, action, isActive, label }, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.preventDefault();
            action();
          }}
          className={`p-2 rounded-md transition-all duration-200 ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
            }`}
          title={label}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
