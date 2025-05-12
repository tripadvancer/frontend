'use client'

import { Popup } from 'react-map-gl/maplibre'

import { RouteResponse } from '@stadiamaps/api'
import { XIcon } from 'lucide-react'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { Distance } from '@/components/ui/distance'
import { Time } from '@/components/ui/time'
import { useDialog } from '@/providers/dialog-provider'
import { getRouteCostingModel } from '@/redux/features/map-slice'
import { getRouteResponse } from '@/redux/features/route-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { useMapRoute } from '@/utils/hooks/use-map-route'
import { LngLat } from '@/utils/types/geo'

import { MapIconCostingModel } from './map-icon-costing-model'

export const MapPopupRoute = () => {
    const userLocation = useAppSelector(getUserLocation)
    const routeResponse = useAppSelector(getRouteResponse) as RouteResponse
    const costingModel = useAppSelector(getRouteCostingModel)
    const dialog = useDialog()

    const { clearRoute } = useMapRoute()

    if (!userLocation || !routeResponse) {
        return null
    }

    const lngLat: LngLat = {
        lng: routeResponse.trip.locations[1].lon,
        lat: routeResponse.trip.locations[1].lat,
    }

    return (
        <Popup
            latitude={routeResponse.trip.locations[1].lat}
            longitude={routeResponse.trip.locations[1].lon}
            offset={[0, -15] as [number, number]}
            closeOnClick={false}
            closeButton={false}
        >
            <div className="relative pr-5">
                <div className="flex h-full items-center gap-x-4">
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
                    <div className="h-8 w-[1px] bg-black-40" />
                    <div
                        className="link text-big-bold text-black-70"
                        onClick={() => dialog.open(<ChooseNavigationApp lngLat={lngLat} />)}
                    >
                        GO
                    </div>
                </div>
                <div
                    className="hover-animated absolute -right-2 -top-2 cursor-pointer text-black-40 hover:text-blue-active"
                    onClick={clearRoute}
                >
                    <XIcon size={16} />
                </div>
            </div>
        </Popup>
    )
}
