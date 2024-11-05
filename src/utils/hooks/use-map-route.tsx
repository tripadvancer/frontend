import { useState } from 'react'
import { GeoJSONSource, useMap } from 'react-map-gl/maplibre'

import { RouteResponse } from '@stadiamaps/api'

import { closeMapPopups, getRouteCostingModel } from '@/redux/features/map-slice'
import { resetRoute, setIsRoutingDisabled, setRouteResponse } from '@/redux/features/route-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getRouteResponseFromApi } from '@/utils/helpers/route'
import { LngLat } from '@/utils/types/geo'

interface useMapRouteInterface {
    buildRoute: (finishPoint: LngLat) => void
    clearRoute: () => void
    isRouting: boolean
}

export function useMapRoute(): useMapRouteInterface {
    const dispatch = useAppDispatch()
    const userLocation = useAppSelector(getUserLocation)
    const costingModel = useAppSelector(getRouteCostingModel)

    const [isRouting, setIsRouting] = useState(false)

    const { map } = useMap()

    const buildRoute = (finishPoint: LngLat) => {
        dispatch(setIsRoutingDisabled(true))
        setIsRouting(true)
        if (userLocation) {
            getRouteResponseFromApi(userLocation, finishPoint, costingModel, handleRouteResponse)
        }
    }

    const clearRoute = () => {
        dispatch(resetRoute())
        const source = map?.getSource('route-source') as GeoJSONSource
        source.setData({ type: 'FeatureCollection', features: [] })
    }

    const handleRouteResponse = (response: RouteResponse) => {
        dispatch(setRouteResponse(response))
        dispatch(closeMapPopups())
        dispatch(setIsRoutingDisabled(false))
        setIsRouting(false)
    }

    return { buildRoute, clearRoute, isRouting }
}
