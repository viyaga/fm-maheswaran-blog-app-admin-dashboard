// pages/editor.js

import React from 'react'
import dynamic from 'next/dynamic'
import RichTextEditor from '@/components/blog/rich-text-editor'

// Dynamically import the editor to prevent SSR issues
// const RichTextEditor = dynamic(() => import('@/components/blog/blog-editor'), { ssr: false })

export default function EditorPage() {
  return (
    <div className="editor-container">
      <h1>Rich Text Editor</h1>
      <RichTextEditor />
    </div>
  )
}
