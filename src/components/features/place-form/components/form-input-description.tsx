'use client'

import { useCallback, useEffect, useState } from 'react'

import classNames from 'classnames'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'

import { validationConfig } from '@/configs/validation.config'
import { useI18n } from '@/utils/i18n/i18n.client'

const maxLength = validationConfig.place.description.maxLength

const createEditorState = (value: string) => {
    if (value.length > 0) {
        return EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
    }

    return EditorState.createEmpty()
}

type FormInputDescriptionProps = {
    value: string
    onChange: (value: string) => void
}

export const FormInputDescription = ({ value, onChange }: FormInputDescriptionProps) => {
    const t = useI18n()

    const [editorState, setEditorState] = useState<EditorState>(() => createEditorState(value))
    const [characterCount, setCharacterCount] = useState(0)

    useEffect(() => {
        const contentState = editorState.getCurrentContent()
        const plainText = contentState.getPlainText('')
        setCharacterCount(plainText.length)
    }, [editorState])

    const handleChangeContent = useCallback(
        (state: EditorState) => {
            const contentState = state.getCurrentContent()
            const contentRaw = convertToRaw(contentState)
            const json = JSON.stringify(contentRaw)
            setEditorState(state)
            onChange(json)
        },
        [onChange],
    )

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col lg:flex-row lg:gap-x-8">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="text-h5-m sm:text-h5">{t('pages.add_place.about.title')}</h2>
                        <div className={classNames(characterCount > maxLength ? 'text-red-100' : 'text-black-40')}>
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
