'use client'

import { useState } from 'react'
import { ViewState } from 'react-map-gl/maplibre'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { getDefaultViewState, stringToViewState, viewStateToString } from '@/utils/helpers/maps'

import { LocationPickerMap } from './location-picker-map'

type LocationPickerMethodOnMapProps = {
    initialValue: string
    onChangeMethod: () => void
    onConfirm: (value: string) => void
}

export const LocationPickerMethodOnMap = ({
    initialValue,
    onChangeMethod,
    onConfirm,
}: LocationPickerMethodOnMapProps) => {
    const t = useTranslations()
    const dialog = useDialog()

    const [viewState, setViewstate] = useState<Partial<ViewState>>(
        initialValue ? stringToViewState(initialValue) : getDefaultViewState(),
    )

    const handleCangeViewState = (viewState: Partial<ViewState>) => {
        setViewstate(viewState)
    }

    const handleConfirm = () => {
        onConfirm(viewStateToString(viewState))
        dialog.close()
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black-15">
                    <LocationPickerMap viewState={viewState} onChangeViewState={handleCangeViewState} />
                </div>
                <div className="cursor-pointer text-center text-blue-100" onClick={onChangeMethod}>
                    {t('dialog.locationPicker.toggleMethodManually')}
                </div>
            </div>
            <FormButton onClick={handleConfirm}>{t('common.action.confirm')}</FormButton>
        </div>
    )
}
