'use client'

import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'

import { TextEditor } from '@/components/ui/text-editor'
import { validationConfig } from '@/configs/validation.config'

const maxLength = validationConfig.place.description.maxLength

type PlaceFormInputDescriptionProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputDescription = ({ value, onChange }: PlaceFormInputDescriptionProps) => {
    const t = useTranslations()
    const [characterCount, setCharacterCount] = useState(0)

    useEffect(() => {
        const clearedValue = removeFormatting(value)
        setCharacterCount(clearedValue.replace(/\s+/g, '').length)
    }, [value])

    const removeFormatting = (text: string) => {
        return text.replace(/([*]{1,2}|[_]{1,2}|~{1,2}|#{1,6}|[!\[]\((.*?)\))/g, '').replace(/[\r\n]/g, '')
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
                <div className="flex-1 text-big">
                    <TextEditor markdown="" onChange={() => {}} />
                </div>
            </div>
        </div>
    )
}
