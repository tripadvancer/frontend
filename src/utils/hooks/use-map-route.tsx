import { useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { CostingModel, DistanceUnit, Route200Response, RouteRequest, RoutingApi } from '@stadiamaps/api'
import { GeoJSONSource } from 'maplibre-gl'
import { useTranslations } from 'next-intl'

import { useToast } from '@/providers/toast-provider'
import { setAppMode } from '@/redux/features/app-slice'
import { closeMapPopups, getRouteCostingModel } from '@/redux/features/map-slice'
import { resetRoute, setIsRoutingDisabled, setRouteResponse } from '@/redux/features/route-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AppModes } from '@/utils/enums'
import { LngLat } from '@/utils/types/geo'

interface useMapRouteInterface {
    buildRoute: (finishPoint: LngLat) => void
    clearRoute: () => void
    isRouting: boolean
}

export function useMapRoute(): useMapRouteInterface {
    const t = useTranslations()
    const toast = useToast()
    const userLocation = useAppSelector(getUserLocation)
    const costingModel = useAppSelector(getRouteCostingModel)
    const dispatch = useAppDispatch()

    const [isRouting, setIsRouting] = useState(false)

    const { map } = useMap()

    const setRoutingState = (state: boolean) => {
        dispatch(setIsRoutingDisabled(state))
        setIsRouting(state)
    }

    const buildRoute = async (finishPoint: LngLat) => {
        if (!userLocation) {
            navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
                if (permissionStatus.state === 'denied') {
                    toast.error(t('geolocation.isNotPermission'))
                    setRoutingState(false)
                }
            })
            return
        }

        setRoutingState(true)

        try {
            const routeRequest = createRouteRequest(userLocation, finishPoint, costingModel)
            const api = new RoutingApi()
            const response = await api.route({ routeRequest })
            handleRouteResponse(response)
        } catch (error) {
            handleRouteError()
        }

        setRoutingState(false)
    }

    const handleRouteResponse = (response: Route200Response) => {
        dispatch(setRouteResponse(response))
        dispatch(closeMapPopups())
        dispatch(setAppMode(AppModes.MAP))
        setRoutingState(false)
    }

    const handleRouteError = () => {
        toast.error(t('route.error'))
        clearRoute()
        setRoutingState(false)
    }

    const clearRoute = () => {
        const source = map?.getSource('route-source') as GeoJSONSource
        source?.setData({ type: 'FeatureCollection', features: [] })
        dispatch(resetRoute())
        setRoutingState(false)
    }

    const createRouteRequest = (start: LngLat, finish: LngLat, costing: CostingModel): RouteRequest => ({
        locations: [
            { lat: start.lat, lon: start.lng, type: 'break' },
            { lat: finish.lat, lon: finish.lng, type: 'break' },
        ],
        costing,
        units: DistanceUnit.Km,
    })

    return { buildRoute, clearRoute, isRouting }
}
