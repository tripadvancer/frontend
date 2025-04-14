'use client'

import { useState } from 'react'

import { Editor } from '@tiptap/react'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'

import { TextEditor } from '@/components/ui/text-editor'
import { validationConfig } from '@/configs/validation.config'

const maxLength = 10

type PlaceFormInputDescriptionProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputDescription = ({ value, onChange }: PlaceFormInputDescriptionProps) => {
    const t = useTranslations()
    const [characterCount, setCharacterCount] = useState(0)

    const handleChange = ({ editor }: { editor: Editor }) => {
        const text = editor.getHTML()
        setCharacterCount(editor.storage.characterCount.characters())
        onChange(text)
    }

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
                    <TextEditor value={value} onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}
