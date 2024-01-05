'use client'

import { useCallback, useEffect, useState } from 'react'

import { Editor, EditorState, convertToRaw } from 'draft-js'

import { validationConfig } from '@/configs/validation.config'
import { useI18n } from '@/utils/i18n/i18n.client'

const maxLength = validationConfig.place.description.maxLength

type DescriptionInputProps = {
    value: string
    onChange: (value: string | null) => void
}

export const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
    const t = useI18n()

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [characterCount, setCharacterCount] = useState(0)

    useEffect(() => {
        const textLength = editorState.getCurrentContent().getPlainText('').length
        setCharacterCount(textLength)
    }, [editorState])

    const handleChangeContent = useCallback(
        (state: EditorState) => {
            const contentState = state.getCurrentContent()
            const contentRaw = JSON.stringify(convertToRaw(contentState))
            const text = contentState.getPlainText('')
            setEditorState(state)
            onChange(contentRaw)
            setCharacterCount(text.length)
        },
        [onChange],
    )

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col lg:flex-row lg:gap-x-8">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="text-h5-m sm:text-h5">{t('pages.add_place.about.title')}</h2>
                        <div className="text-black-40">
                            {characterCount} / {maxLength}
                        </div>
                    </div>
                </div>
                <div className="hidden w-64 lg:block" />
            </div>

            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                <div className="w-full text-black-40 lg:w-64">{t('pages.add_place.about.info')}</div>
                <div className="flex-1 text-big">
                    <Editor
                        editorState={editorState}
                        placeholder={t('placeholder.action.about_place')}
                        stripPastedStyles
                        onChange={handleChangeContent}
                    />
                </div>
            </div>
        </div>
    )
}
