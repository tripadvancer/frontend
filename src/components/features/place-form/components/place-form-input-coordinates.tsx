'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

type PlaceFormInputCoordinatesProps = {
    value: string
    onChange: (value: string | null) => void
}

export const PlaceFormInputCoordinates = ({ value, onChange }: PlaceFormInputCoordinatesProps) => {
    const t = useI18n()

    return (
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-transparent text-center text-big text-white placeholder:text-white focus:outline-none"
            placeholder={t('placeholder.place.coordinates')}
        />
    )
}
