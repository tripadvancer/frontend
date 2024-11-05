'use client'

import { Popup } from 'react-map-gl/maplibre'

import { CloseIcon16 } from '@/components/ui/icons'
import { getRouteResponse } from '@/redux/features/route-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { useMapRoute } from '@/utils/hooks/use-map-route'

export const MapPopupRoute = () => {
    const userLocation = useAppSelector(getUserLocation)
    const routeResponse = useAppSelector(getRouteResponse)

    const { clearRoute } = useMapRoute()

    if (!userLocation || !routeResponse) {
        return null
    }

    return (
        <Popup
            latitude={userLocation.lat}
            longitude={userLocation.lng}
            anchor="left"
            offset={[10, -5] as [number, number]}
            closeOnClick={false}
            closeButton={false}
        >
            <div className="flex items-center gap-x-2">
                <div>{routeResponse.trip.summary.length} km</div>
                <div
                    className="hover-animated cursor-pointer text-black-40 hover:text-blue-active"
                    onClick={clearRoute}
                >
                    <CloseIcon16 />
                </div>
            </div>
        </Popup>
    )
}
