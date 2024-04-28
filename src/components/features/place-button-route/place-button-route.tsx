'use client'

import { GeoJSONSource, LngLatLike, useMap } from 'react-map-gl/maplibre'

import polyline from '@mapbox/polyline'
import { CostingModel } from '@stadiamaps/api'

import type { LngLat } from '@/utils/types/geo'

import { FormButton } from '@/components/ui/form-button'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { buildRoute } from '@/utils/helpers/route'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceButtonRoute = ({ lngLat }: { lngLat: LngLat }) => {
    const t = useI18n()
    const userLocation = useAppSelector(getUserLocation)
    const { map } = useMap()

    const handleRoute = () => {
        if (userLocation) {
            buildRoute(userLocation, lngLat, CostingModel.Truck, function (response) {
                // Construct a bounding box in the sw, ne format required by MapLibre. Note the lon, lat order.
                var sw = [response.trip.summary.minLon, response.trip.summary.minLat] as LngLatLike
                var ne = [response.trip.summary.maxLon, response.trip.summary.maxLat] as LngLatLike

                // Zoom to the new bounding box to focus on the route,
                // with a 50px padding around the edges. See https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#fitbounds
                map?.fitBounds([sw, ne])

                // For each leg of the trip...
                response.trip.legs.forEach(leg => {
                    const geometry = polyline.toGeoJSON(leg.shape, 6)
                    const source = map?.getSource('route-source') as GeoJSONSource
                    source.setData(geometry)
                })
            })
        }
    }

    return (
        <FormButton type="stroke" size="small" onClick={handleRoute}>
            {t('common.action.route')}
        </FormButton>
    )
}
