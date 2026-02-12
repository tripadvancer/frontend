'use client'

import { ChangeEvent, useState } from 'react'

import { useTranslations } from 'next-intl'

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
    const t = useTranslations()
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
                    placeholder={t('dialog.locationPicker.placeholder')}
                    onChange={handleChangeValue}
                    error={!isValueValid ? t('validation.location.invalid') : ''}
                />
                <div className="cursor-pointer text-center text-blue-100" onClick={onChangeMethod}>
                    {t('dialog.locationPicker.toggleMethodOnMap')}
                </div>
            </div>
            <FormButton onClick={handleConfirm} isDisabled={!value}>
                {t('common.action.confirm')}
            </FormButton>
        </div>
    )
}
