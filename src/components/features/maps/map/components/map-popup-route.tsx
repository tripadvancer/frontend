'use client'

import { Popup } from 'react-map-gl/maplibre'

import { RouteResponse } from '@stadiamaps/api'

import { Distance } from '@/components/ui/distance'
import { CloseIcon16 } from '@/components/ui/icons'
import { Time } from '@/components/ui/time'
import { getRouteCostingModel } from '@/redux/features/map-slice'
import { getRouteResponse } from '@/redux/features/route-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { useMapRoute } from '@/utils/hooks/use-map-route'

import { MapIconCostingModel } from './map-icon-costing-model'

export const MapPopupRoute = () => {
    const userLocation = useAppSelector(getUserLocation)
    const routeResponse = useAppSelector(getRouteResponse) as RouteResponse
    const costingModel = useAppSelector(getRouteCostingModel)

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
            <div className="relative pr-6">
                <div>
                    <div className="flex items-center gap-x-2">
                        <MapIconCostingModel costingModel={costingModel} />
                        <Time time={routeResponse.trip.summary.time} />
                    </div>
                    <Distance
                        distance={routeResponse.trip.summary.length * 1000}
                        className="ml-6 text-small text-black-40"
                    />
                </div>
                <div
                    className="hover-animated absolute -right-2 -top-2 cursor-pointer text-black-40 hover:text-blue-active"
                    onClick={clearRoute}
                >
                    <CloseIcon16 />
                </div>
            </div>
        </Popup>
    )
}
