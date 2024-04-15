'use client'

import { useCallback, useRef, useState } from 'react'
import { MapRef, Map as ReactMapGl, ViewState, ViewStateChangeEvent } from 'react-map-gl'

import Image from 'next/image'

import type { LngLat } from '@/utils/types/geo'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { LocationIcon16, MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'
import { useDialog } from '@/providers/dialog-provider'
import {
    getDefaultViewState,
    getFlyToViewState,
    stringCoordinatesIsValid,
    stringToViewState,
    viewStateToString,
} from '@/utils/helpers/maps'
import { useUserLocation } from '@/utils/hooks/use-user-location'
import { useI18n } from '@/utils/i18n/i18n.client'

type LocationPickerProps = {
    location: string
    onConfirm: (value: string) => void
}

export const LocationPicker = ({ location, onConfirm }: LocationPickerProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const mapRef = useRef<MapRef>(null)

    const locationIsValidStringCoordinates = stringCoordinatesIsValid(location)

    const [isUserLocating, setIsUserLocating] = useState<boolean>(false)
    const [viewState, setViewState] = useState<ViewState>(
        locationIsValidStringCoordinates ? stringToViewState(location) : getDefaultViewState(),
    )

    const handleMapMove = useCallback((event: ViewStateChangeEvent) => {
        setViewState(event.viewState)
    }, [])

    const handleUserLocate = () => {
        if ('geolocation' in navigator) {
            setIsUserLocating(true)
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                const lngLat: LngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
                setViewState(getFlyToViewState(lngLat))
                setIsUserLocating(false)
            })
        }
    }

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    const handleConfirm = async () => {
        onConfirm(viewStateToString(viewState))
        dialog.close()
    }

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('location_picker.title')}</h1>
            <div className="flex flex-col gap-y-4">
                <FormInput
                    type="text"
                    name={''}
                    value={viewStateToString(viewState)}
                    placeholder={t('location_picker.placeholder')}
                    onChange={() => {}}
                />
                <div className="relative h-96 w-full overflow-hidden rounded-lg bg-black-15">
                    <ReactMapGl
                        {...viewState}
                        ref={mapRef}
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        attributionControl={false}
                        reuseMaps
                        onMove={handleMapMove}
                    >
                        <div className="absolute bottom-2 right-2 flex flex-col gap-y-1">
                            <MapControl desktopOnly onClick={handleZoomIn}>
                                <PlusIcon16 />
                            </MapControl>

                            <MapControl desktopOnly onClick={handleZoomOut}>
                                <MinusIcon16 />
                            </MapControl>

                            <MapControl isLoading={isUserLocating} onClick={handleUserLocate}>
                                <LocationIcon16 />
                            </MapControl>
                        </div>
                    </ReactMapGl>
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
