'use client'

import classNames from 'classnames'
import { PencilIcon } from 'lucide-react'

import { LocationPicker } from '@/components/features/dialogs/location-picker/location-picker'
import { useDialog } from '@/components/providers/dialog-provider'
import { stringCoordinatesIsValid } from '@/utils/helpers/maps'

type PlaceFormInputLocationProps = {
    value: string
    error?: string
    onChange: (value: string) => void
}

export const PlaceFormInputLocation = ({ value, error, onChange }: PlaceFormInputLocationProps) => {
    const dialog = useDialog()
    const valueIsValidStringCoordinates = stringCoordinatesIsValid(value)

    const handleClick = () => {
        dialog.open(<LocationPicker location={valueIsValidStringCoordinates ? value : ''} onConfirm={onChange} />)
    }

    return (
        <div
            className={classNames(
                'group text-big hover:text-blue-active flex cursor-pointer items-center gap-x-2 text-blue-100',
                {
                    'text-red-100': error,
                },
            )}
            onClick={handleClick}
        >
            {valueIsValidStringCoordinates ? (
                <>
                    {value}
                    <PencilIcon size={20} />
                </>
            ) : (
                'Pick place location'
            )}
        </div>
    )
}
