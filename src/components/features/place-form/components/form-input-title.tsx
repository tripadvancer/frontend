'use client'

import { FormContentEditable } from '@/components/ui/form-content-editable'
import { useI18n } from '@/utils/i18n/i18n.client'

type FormInputTitleProps = {
    value: string
    onChange: (value: string) => void
}

export const FormInputTitle = ({ value, onChange }: FormInputTitleProps) => {
    const t = useI18n()

    return (
        <FormContentEditable
            value={value}
            className="relative w-full text-center text-h1-m text-white before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:cursor-text focus:outline-none sm:text-h1"
            placeholder={t('placeholder.place.title')}
            onChange={onChange}
        />
    )
}
