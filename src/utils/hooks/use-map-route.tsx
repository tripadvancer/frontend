import { useState } from 'react'
import { GeoJSONSource, useMap } from 'react-map-gl/maplibre'

import { CostingModel, DistanceUnit, Route200Response, RouteRequest, RoutingApi } from '@stadiamaps/api'
import { useTranslations } from 'next-intl'

import { useToast } from '@/providers/toast-provider'
import { closeMapPopups, getRouteCostingModel } from '@/redux/features/map-slice'
import { resetRoute, setIsRoutingDisabled, setRouteResponse } from '@/redux/features/route-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LngLat } from '@/utils/types/geo'

import { useUserLocation } from './use-user-location'

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

    const { handleLocate } = useUserLocation()
    const { map } = useMap()

    const setRoutingState = (state: boolean) => {
        dispatch(setIsRoutingDisabled(state))
        setIsRouting(state)
    }

    const buildRoute = async (finishPoint: LngLat) => {
        setRoutingState(true)

        if (!userLocation) {
            handleLocate()
            setRoutingState(false)
            return
        }

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
