// components/TipTapEditor.tsx

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Code from '@tiptap/extension-code';
import {CodeBlock} from '@tiptap/extension-code-block';

import style from './TipTap.module.scss';
import {Link} from "@tiptap/extension-link";

type TipTapEditorProps = {
    initialContent: string;
    onChangeContent: (content: string) => void;
    editable?: boolean;
};

const TipTapEditor = ({ initialContent, onChangeContent, editable = true }: TipTapEditorProps) => {
    const editor = useEditor({
        content: initialContent,
        extensions: [
            StarterKit,
            Code.configure({
                HTMLAttributes: {
                    class: style['inline-code'],  // SCSS 클래스 적용
                },
            }),
            CodeBlock.configure({
                HTMLAttributes: {
                    class: style['code-block'],  // SCSS 클래스 적용
                },
            }),
            Link.configure({
                openOnClick: false, // 링크를 클릭할 때 새 탭에서 열리지 않도록 설정
                linkOnPaste: true, // 링크를 붙여넣으면 자동으로 링크 인식
            }),
        ],
        editable: editable,
        onUpdate({ editor }) {
            const contentHTML = editor.getHTML();
            onChangeContent(contentHTML);
        },
    });

    // Cleanup editor on component unmount
    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    return (
        <div className="prose max-w-none mb-4">
            <EditorContent editor={editor} />
        </div>
    );
};

export default TipTapEditor;
