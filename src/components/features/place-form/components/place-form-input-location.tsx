'use client'

import { useDialog } from '@/providers/dialog-provider'
import { stringCoordinatesIsValid } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

import { LocationPicker } from './location-picker/location-picker'

type PlaceFormInputLocationProps = {
    value: string
    onChange: (value: string) => void
}

export const PlaceFormInputLocation = ({ value, onChange }: PlaceFormInputLocationProps) => {
    const t = useI18n()
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
            {valueIsValidStringCoordinates ? value : t('placeholder.place.coordinates')}
        </div>
    )
}
