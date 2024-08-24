'use client'

import { useTranslations } from 'next-intl'

import { LocationPicker } from '@/components/features/dialogs/location-picker/location-picker'
import { useDialog } from '@/providers/dialog-provider'
import { stringCoordinatesIsValid } from '@/utils/helpers/maps'

type PlaceFormInputLocationProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputLocation = ({ value, onChange }: PlaceFormInputLocationProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const valueIsValidStringCoordinates = stringCoordinatesIsValid(value)

    const handleClick = () => {
        dialog.open(<LocationPicker location={valueIsValidStringCoordinates ? value : ''} onConfirm={onChange} />)
    }

    return (
        <div
            className="hover-animated cursor-pointer text-center text-big text-white hover:text-blue-active"
            onClick={handleClick}
        >
            {valueIsValidStringCoordinates ? value : t('page.placeForm.field.location.placeholder')}
        </div>
    )
}
