'use client'

import { ChangeEvent, useState } from 'react'

import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { stringCoordinatesIsValid } from '@/utils/helpers/maps'

type LocationPickerMethodManuallyProps = {
    initialValue: string
    onChangeMethod: () => void
    onConfirm: (value: string) => void
}

export const LocationPickerMethodManually = ({
    initialValue,
    onChangeMethod,
    onConfirm,
}: LocationPickerMethodManuallyProps) => {
    const dialog = useDialog()

    const [value, setValue] = useState(initialValue)
    const [isValueValid, setIsValueValid] = useState<boolean>(true)

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleConfirm = () => {
        const locationIsValidStringCoordinates = stringCoordinatesIsValid(value)
        setIsValueValid(locationIsValidStringCoordinates)

        if (locationIsValidStringCoordinates) {
            onConfirm(value)
            dialog.close()
        }
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
                <FormInput
                    type="text"
                    name="location"
                    value={value}
                    autoComplete="off"
                    autoFocus
                    placeholder="Enter coordinates"
                    onChange={handleChangeValue}
                    error={!isValueValid ? "Coordinates must be in format: 'lat, lng', e.g. '50.4501, 30.5234'" : ''}
                />
                <div className="cursor-pointer text-center text-blue-100" onClick={onChangeMethod}>
                    Select a location on the map
                </div>
            </div>
            <FormButton onClick={handleConfirm} isDisabled={!value}>
                Confirm
            </FormButton>
        </div>
    )
}
