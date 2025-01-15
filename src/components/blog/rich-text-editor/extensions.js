import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import StarterKit from '@tiptap/starter-kit'

const extensions = [
    Document,
    Paragraph,
    Text,
    Image,
    Dropcursor,
    Bold,
    Italic,
    ListItem,
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
  ]

  export default extensions;