'use client'

import TextareaAutosize from 'react-textarea-autosize'

import { useI18n } from '@/utils/i18n/i18n.client'

type PlaceFormInputTitleProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputTitle = ({ value, onChange }: PlaceFormInputTitleProps) => {
    const t = useI18n()

    return (
        <TextareaAutosize
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full resize-none bg-transparent text-center text-h1-m text-white placeholder:text-white focus:outline-none"
            placeholder={t('placeholder.place.title')}
        />
    )
}
