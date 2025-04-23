'use client'

import { useState } from 'react'

import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import classNames from 'classnames'
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { validationConfig } from '@/configs/validation.config'

import { PlaceFormInputDescriptionButton } from './place-form-input-description-button'

const maxLength = validationConfig.place.description.maxLength

type PlaceFormInputDescriptionProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputDescription = ({ value, onChange }: PlaceFormInputDescriptionProps) => {
    const t = useTranslations()
    const [characterCount, setCharacterCount] = useState(0)

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
        onCreate: ({ editor }) => {
            setCharacterCount(editor.storage.characterCount.characters())
        },
        onUpdate: ({ editor }) => {
            const text = editor.getHTML()
            setCharacterCount(editor.storage.characterCount.characters())
            onChange(text)
        },
        editorProps: {
            transformPastedHTML: html => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(html, 'text/html')
                return doc.body.textContent ?? ''
            },
        },
    })

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                <div className="w-full text-black-40 lg:w-64">
                    <div className="lg:hidden">{t('page.placeForm.field.about.text')}</div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="h5">{t('page.placeForm.field.about.label')}</h2>
                        <div className={classNames(characterCount > maxLength ? 'text-red-100' : 'text-black-40')}>
                            {characterCount} / {maxLength}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                <div className="hidden w-full text-black-40 lg:block lg:w-64">
                    {t('page.placeForm.field.about.text')}
                </div>
                <div className="min-w-0 flex-1 text-big">
                    {editor && (
                        <div className="flex flex-col gap-y-4">
                            <div className="sticky top-16 z-10">
                                <div className="absolute -bottom-2.5 -left-2.5 -right-2.5 -top-3 z-10 bg-white/50 backdrop-blur-[2px]" />
                                <div className="relative z-20 flex gap-x-2">
                                    <PlaceFormInputDescriptionButton
                                        icon={<BoldIcon size={24} />}
                                        isActive={editor.isActive('bold')}
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                    />
                                    <PlaceFormInputDescriptionButton
                                        icon={<ItalicIcon size={24} />}
                                        isActive={editor.isActive('italic')}
                                        onClick={() => editor.chain().focus().toggleItalic().run()}
                                    />
                                    <PlaceFormInputDescriptionButton
                                        icon={<UnderlineIcon size={24} />}
                                        isActive={editor.isActive('underline')}
                                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                                    />
                                    <PlaceFormInputDescriptionButton
                                        icon={<StrikethroughIcon size={24} />}
                                        isActive={editor.isActive('strike')}
                                        onClick={() => editor.chain().focus().toggleStrike().run()}
                                    />
                                </div>
                            </div>
                            <EditorContent editor={editor} className="tiptap-editor" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
