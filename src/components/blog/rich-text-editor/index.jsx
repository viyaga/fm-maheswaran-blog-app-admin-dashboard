"use client";
// components/RichTextEditor.js

import './styles.css'

import { useEditor, EditorContent } from '@tiptap/react'
import React from 'react'
import extensions from './extensions';
import Toolbar from './toolbar';

export default function RichTextEditor() {
  const editor = useEditor({
    extensions: extensions,
    content: `
      <p>This is a basic example of implementing images. Drag to re-order.</p>
    `,
  })

  const addImage = () => {
    const url = window.prompt('Enter the image URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  if (!editor) {
    return null
  }

  return (
    <>
      <Toolbar editor={editor} />
      <div className="button-group">
        <button onClick={addImage}>Add image from URL</button>
      </div>
      <EditorContent editor={editor} />
    </>
  )
}
