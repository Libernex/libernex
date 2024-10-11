'use client'
import styles from './TipTap.module.scss'

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { all, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

const lowlight = createLowlight(all);
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
        StarterKit,
        CodeBlockLowlight.configure({
            lowlight,
          }),
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div className={`${styles.tiptap} prose focus:outline-none`}>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTapEditor