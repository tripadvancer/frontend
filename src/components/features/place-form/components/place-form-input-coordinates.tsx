'use client'

import { LocationPicker } from '@/components/features/location-picker/location-picker'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type PlaceFormInputCoordinatesProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputCoordinates = ({ value, onChange }: PlaceFormInputCoordinatesProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<LocationPicker coordinates={value} onConfirm={onChange} />)
    }

    return (
        <div
            className="hover-animated w-full cursor-pointer text-center text-big text-white hover:text-blue-active"
            onClick={handleClick}
        >
            {value || t('placeholder.place.coordinates')}
        </div>
    )
}
