'use client'

import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { TextEditorButton } from './text-editor-button'

type TextEditorProps = {
    value: string
    onChange: ({ editor }: { editor: Editor }) => void
}

export const TextEditor = ({ value, onChange }: TextEditorProps) => {
    const t = useTranslations()

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: t('page.placeForm.field.about.placeholder'),
                emptyEditorClass: 'is-editor-empty',
            }),
            Underline,
            CharacterCount,
        ],
        content: value,
        onUpdate: onChange,
        editorProps: {
            transformPastedHTML: html => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(html, 'text/html')
                return doc.body.textContent ?? ''
            },
        },
    })

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="sticky top-16 z-10">
                <div className="absolute -bottom-2.5 -left-2.5 -right-2.5 -top-3 z-10 bg-white/50 backdrop-blur-[2px]" />
                <div className="relative z-20 flex gap-x-2">
                    <TextEditorButton
                        icon={<BoldIcon size={24} />}
                        isActive={editor.isActive('bold')}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    />
                    <TextEditorButton
                        icon={<ItalicIcon size={24} />}
                        isActive={editor.isActive('italic')}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    />
                    <TextEditorButton
                        icon={<UnderlineIcon size={24} />}
                        isActive={editor.isActive('underline')}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    />

                    <TextEditorButton
                        icon={<StrikethroughIcon size={24} />}
                        isActive={editor.isActive('strike')}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                    />
                </div>
            </div>
            <EditorContent editor={editor} className="tiptap-editor" />
        </div>
    )
}
