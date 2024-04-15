'use client'

import { useState } from 'react'
import { ViewState } from 'react-map-gl'

import Image from 'next/image'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import {
    getDefaultViewState,
    stringCoordinatesIsValid,
    stringToViewState,
    viewStateToString,
} from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

import { LocationPickerMap } from './location-picker-map'
import { LocationPickerSearch } from './location-picker-search'

type LocationPickerProps = {
    location: string
    onConfirm: (value: string) => void
}

export const LocationPicker = ({ location, onConfirm }: LocationPickerProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const locationIsValidStringCoordinates = stringCoordinatesIsValid(location)

    const [viewState, setViewState] = useState<ViewState>(
        locationIsValidStringCoordinates ? stringToViewState(location) : getDefaultViewState(),
    )

    const handleConfirm = async () => {
        onConfirm(viewStateToString(viewState))
        dialog.close()
    }

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('location_picker.title')}</h1>
            <div className="flex flex-col gap-y-4">
                <LocationPickerSearch />
                <div className="relative h-96 w-full overflow-hidden rounded-lg bg-black-15">
                    <LocationPickerMap viewState={viewState} onMove={setViewState} />
                    <Image
                        src="/images/pin-blue.svg"
                        width={27}
                        height={41}
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                        alt=""
                    />
                </div>
            </div>
            <FormButton type="stroke" onClick={handleConfirm}>
                {t('common.action.confirm')}
            </FormButton>
        </div>
    )
}
