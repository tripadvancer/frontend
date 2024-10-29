'use client'

import { useState } from 'react'
import { ViewState } from 'react-map-gl/maplibre'

import { useTranslations } from 'next-intl'

import Image from 'next/image'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import {
    getDefaultViewState,
    getFlyToViewState,
    stringCoordinatesIsValid,
    stringToViewState,
    viewStateToString,
} from '@/utils/helpers/maps'
import { LngLat } from '@/utils/types/geo'

import { LocationPickerMap } from './location-picker-map'
import { LocationPickerSearch } from './location-picker-search'

type LocationPickerProps = {
    location: string
    onConfirm: (value: string) => void
}

export const LocationPicker = ({ location, onConfirm }: LocationPickerProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const locationIsValidStringCoordinates = stringCoordinatesIsValid(location)

    const [viewState, setViewState] = useState<Partial<ViewState>>(
        locationIsValidStringCoordinates ? stringToViewState(location) : getDefaultViewState(),
    )

    const [isMoving, setIsMoving] = useState<boolean>(false)

    const handleLocationSelect = (lngLat: LngLat) => {
        const viewState = getFlyToViewState(lngLat)
        setViewState(viewState)
    }

    const handleConfirm = async () => {
        onConfirm(viewStateToString(viewState))
        dialog.close()
    }

    const onMoveStart = () => {
        setIsMoving(true)
    }

    const onMoveEnd = () => {
        setIsMoving(false)
    }

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('dialog.locationPicker.title')}</h1>
            <div className="flex flex-col gap-y-2">
                <LocationPickerSearch onLocationSelect={handleLocationSelect} />
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black-15">
                    <LocationPickerMap
                        viewState={viewState}
                        onMove={setViewState}
                        onMoveStart={onMoveStart}
                        onMoveEnd={onMoveEnd}
                    />
                    <Image
                        src="/images/location-picker/location-picker-pin-shadow.svg"
                        width={27}
                        height={41}
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[13.5px] -translate-y-[36px]"
                        alt=""
                    />

                    <Image
                        src="/images/location-picker/location-picker-pin.svg"
                        width={27}
                        height={41}
                        alt=""
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[13.5px] -translate-y-[36px]"
                        style={{ marginTop: isMoving ? -8 : 0 }}
                    />
                </div>
            </div>
            <FormButton onClick={handleConfirm}>{t('common.action.confirm')}</FormButton>
        </div>
    )
}
