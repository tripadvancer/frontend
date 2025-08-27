'use client'

import TextareaAutosize from 'react-textarea-autosize'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'

type PlaceFormInputTitleProps = {
    value: string
    error?: string
    onChange: (value: string) => void
}

export const PlaceFormInputTitle = ({ value, error, onChange }: PlaceFormInputTitleProps) => {
    const t = useTranslations()

    return (
        <TextareaAutosize
            value={value}
            onChange={e => onChange(e.target.value)}
            className={classNames(
                'h1 w-full resize-none bg-transparent align-top placeholder:text-black-40 focus:outline-none',
                { 'text-red-100 placeholder:text-red-100': error },
            )}
            placeholder={t('page.placeForm.field.title.placeholder')}
        />
    )
}
