'use client'

import { Marker } from 'react-map-gl/maplibre'

import { getUserLocation } from '@/utils/redux/features/user-slice'
import { useAppSelector } from '@/utils/redux/hooks'

export const MapPinUser = () => {
    const userLocation = useAppSelector(getUserLocation)

    if (!userLocation) {
        return null
    }

    return (
        <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="bottom">
            <div className="flex-center relative flex size-3">
                <div className="absolute h-full w-full animate-ping rounded-full bg-blue-active opacity-75" />
                <div className="relative inline-flex size-full rounded-full border border-white bg-blue-active" />
            </div>
        </Marker>
    )
}
