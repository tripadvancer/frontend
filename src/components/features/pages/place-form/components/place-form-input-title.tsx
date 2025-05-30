'use client'

import TextareaAutosize from 'react-textarea-autosize'

import { useTranslations } from 'next-intl'

type PlaceFormInputTitleProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputTitle = ({ value, onChange }: PlaceFormInputTitleProps) => {
    const t = useTranslations()

    return (
        <TextareaAutosize
            value={value}
            onChange={e => onChange(e.target.value)}
            className="title w-full resize-none bg-transparent text-center text-white placeholder:text-white focus:outline-none"
            placeholder={t('page.placeForm.field.title.placeholder')}
        />
    )
}
