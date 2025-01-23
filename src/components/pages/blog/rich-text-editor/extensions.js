import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';
import { Node } from '@tiptap/core';

// Custom extension for embedding YouTube videos via iframe
const VideoEmbed = Node.create({
  name: 'videoEmbed',
  inline: false,
  group: 'block',
  content: 'text*',
  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: '560',
      },
      height: {
        default: '315',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'iframe[src]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['iframe', { ...HTMLAttributes, allowfullscreen: 'true', frameborder: '0' }];
  },
});

export { VideoEmbed };

const extensions = [
  // Basic formatting extensions
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
  Document,
  Paragraph,
  Text,
  Image,
  Dropcursor,
  Bold,
  Italic,
  Underline,
  Strike,
  Blockquote,
  CodeBlock,
  Link.configure({ openOnClick: true }),
  Highlight,
  ListItem,
  Table.configure({ resizable: true }),
  TableRow,
  TableCell,
  TableHeader,
  TaskList,
  TaskItem,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),

  // Custom video embed extension
  VideoEmbed,
];

export default extensions;
