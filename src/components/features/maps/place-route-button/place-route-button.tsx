'use client'

import { useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import { GeoJSONSource, LngLatLike, useMap } from 'react-map-gl/maplibre'

import polyline from '@mapbox/polyline'
import { CostingModel, RouteResponse } from '@stadiamaps/api'
import { useTranslations } from 'next-intl'

import { LngLat } from '@/utils/types/geo'

import { FormButton } from '@/components/ui/form-button'
import { useToast } from '@/providers/toast-provider'
import { closeMapPopups } from '@/redux/features/map-slice'
import { getUserLocation, setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { buildRoute } from '@/utils/helpers/route'

type PlaceButtonRouteProps = {
    lngLat: LngLat
}

export const PlaceButtonRoute = ({ lngLat }: PlaceButtonRouteProps) => {
    const t = useTranslations()
    const toast = useToast()
    const dispatch = useAppDispatch()
    const userLocation = useAppSelector(getUserLocation)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { map } = useMap()

    const { getPosition } = useGeolocated({
        suppressLocationOnMount: true,
        positionOptions: {
            enableHighAccuracy: false,
        },
        onSuccess: (position: GeolocationPosition) => {
            const userLngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
            buildRoute(userLngLat, lngLat, CostingModel.Truck, handleRouteResponse)
            dispatch(setUserLocation(userLngLat))
        },
        onError: () => {
            toast.error(t('common.error'))
            setIsLoading(false)
        },
    })

    const handleRoute = () => {
        setIsLoading(true)

        if (userLocation) {
            buildRoute(userLocation, lngLat, CostingModel.Auto, handleRouteResponse)
            return
        }

        getPosition()
    }

    const handleRouteResponse = (response: RouteResponse) => {
        // Construct a bounding box in the sw, ne format required by MapLibre. Note the lon, lat order.
        const sw = [response.trip.summary.minLon, response.trip.summary.minLat] as LngLatLike
        const ne = [response.trip.summary.maxLon, response.trip.summary.maxLat] as LngLatLike

        // Zoom to the new bounding box to focus on the route,
        // with a 50px padding around the edges. See https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#fitbounds
        map?.fitBounds([sw, ne])

        // For each leg of the trip...
        response.trip.legs.forEach(leg => {
            const geometry = polyline.toGeoJSON(leg.shape, 6)
            const source = map?.getSource('route-source') as GeoJSONSource
            source.setData(geometry)
        })

        dispatch(closeMapPopups())

        setIsLoading(false)
    }

    return (
        <FormButton type="stroke" size="small" isLoading={isLoading} onClick={handleRoute}>
            {t('common.action.route')}
        </FormButton>
    )
}
