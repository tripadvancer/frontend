'use client'

import { FormContentEditable } from '@/components/ui/form-content-editable'
import { useI18n } from '@/utils/i18n/i18n.client'

type PlaceFormInputTitleProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputTitle = ({ value, onChange }: PlaceFormInputTitleProps) => {
    const t = useI18n()

    return (
        <FormContentEditable
            value={value}
            className="w-full text-center text-h1-m text-white sm:text-h1"
            placeholder={t('placeholder.place.title')}
            onChange={onChange}
        />
    )
}
