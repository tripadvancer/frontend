import { useState } from 'react'
import { GeoJSONSource, useMap } from 'react-map-gl/maplibre'

import { DistanceUnit, Route200Response, RoutingApi } from '@stadiamaps/api'

import { useToast } from '@/providers/toast-provider'
import { closeMapPopups, getRouteCostingModel } from '@/redux/features/map-slice'
import { resetRoute, setIsRoutingDisabled, setRouteResponse } from '@/redux/features/route-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LngLat } from '@/utils/types/geo'

interface useMapRouteInterface {
    buildRoute: (finishPoint: LngLat) => void
    clearRoute: () => void
    isRouting: boolean
}

export function useMapRoute(): useMapRouteInterface {
    const api = new RoutingApi()
    const dispatch = useAppDispatch()
    const toast = useToast()
    const userLocation = useAppSelector(getUserLocation)
    const costingModel = useAppSelector(getRouteCostingModel)

    const [isRouting, setIsRouting] = useState(false)

    const { map } = useMap()

    const buildRoute = async (finishPoint: LngLat) => {
        dispatch(setIsRoutingDisabled(true))
        setIsRouting(true)
        if (userLocation) {
            try {
                const response = await api.route({
                    routeRequest: {
                        locations: [
                            {
                                lat: userLocation.lat,
                                lon: userLocation.lng,
                                type: 'break',
                            },
                            {
                                lat: finishPoint.lat,
                                lon: finishPoint.lng,
                                type: 'break',
                            },
                        ],
                        costing: costingModel,
                        units: DistanceUnit.Km,
                    },
                })
                handleRouteResponse(response)
            } catch (e) {
                toast.error('Failed to build route')
                dispatch(setIsRoutingDisabled(false))
                setIsRouting(false)
            }
        }
    }

    const clearRoute = () => {
        dispatch(resetRoute())
        const source = map?.getSource('route-source') as GeoJSONSource
        source.setData({ type: 'FeatureCollection', features: [] })
    }

    const handleRouteResponse = (response: Route200Response) => {
        dispatch(setRouteResponse(response))
        dispatch(closeMapPopups())
        dispatch(setIsRoutingDisabled(false))
        setIsRouting(false)
    }

    return { buildRoute, clearRoute, isRouting }
}
