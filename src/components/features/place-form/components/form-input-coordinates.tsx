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
            className="w-full text-center text-big text-white"
            placeholder={t('placeholder.place.coordinates')}
            onChange={onChange}
        />
    )
}
