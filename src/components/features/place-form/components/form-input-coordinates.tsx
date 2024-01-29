'use client'

import { FormContentEditable } from '@/components/ui/form-content-editable'
import { useI18n } from '@/utils/i18n/i18n.client'

type FormInputCoordinatesProps = {
    value: string
    onChange: (value: string | null) => void
}

export const FormInputCoordinates = ({ value, onChange }: FormInputCoordinatesProps) => {
    const t = useI18n()

    return (
        <FormContentEditable
            value={value}
            className="relative w-full text-center text-big text-white before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:cursor-text focus:outline-none"
            placeholder={t('placeholder.place.coordinates')}
            onChange={onChange}
        />
    )
}
