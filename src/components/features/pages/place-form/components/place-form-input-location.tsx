'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'

import { LocationPicker } from '@/components/features/dialogs/location-picker/location-picker'
import { useDialog } from '@/providers/dialog-provider'
import { stringCoordinatesIsValid } from '@/utils/helpers/maps'

type PlaceFormInputLocationProps = {
    value: string
    error?: string
    onChange: (value: string) => void
}

export const PlaceFormInputLocation = ({ value, error, onChange }: PlaceFormInputLocationProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const valueIsValidStringCoordinates = stringCoordinatesIsValid(value)

    const handleClick = () => {
        dialog.open(<LocationPicker location={valueIsValidStringCoordinates ? value : ''} onConfirm={onChange} />)
    }

    return (
        <div
            className={classNames('hover-animated cursor-pointer text-big text-blue-100 hover:text-blue-active', {
                'text-red-100': error,
            })}
            onClick={handleClick}
        >
            {valueIsValidStringCoordinates ? value : t('page.placeForm.field.location.placeholder')}
        </div>
    )
}
