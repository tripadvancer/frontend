'use client'

import { GeoJSONSource, LngLatLike, useMap } from 'react-map-gl/maplibre'

import polyline from '@mapbox/polyline'
import { Configuration, CostingModel, RouteRequest, RouteResponse, RoutingApi } from '@stadiamaps/api'

import Link from 'next/link'

import type { IRandomPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { PinIcon16 } from '@/components/ui/icons'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { closeWidget } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ImageVariant } from '@/utils/enums'
import { navigateToLocation } from '@/utils/helpers/common'
import { useI18n } from '@/utils/i18n/i18n.client'

function simple_route(
    startLat: number,
    startLon: number,
    endLat: number,
    endLon: number,
    costing: CostingModel,
    callback: (response: RouteResponse) => void,
) {
    const api = new RoutingApi()

    // Build a request body for the route request
    const req: RouteRequest = {
        locations: [
            {
                lat: startLat,
                lon: startLon,
                type: 'break',
            },
            {
                lat: endLat,
                lon: endLon,
                type: 'break',
            },
        ],
        costing: costing,
    }

    api.route({ routeRequest: req })
        .then(callback)
        .catch(function (e) {
            console.error(e)
        })
}

export const WidgetPlacesRandomPlace = (place: IRandomPlace) => {
    const t = useI18n()
    const { mainMap } = useMap()
    const userLocation = useAppSelector(getUserLocation)
    const dispatch = useAppDispatch()

    const handleShowOnMap = () => {
        dispatch(
            setMapViewState({
                latitude: place.coordinates[1],
                longitude: place.coordinates[0],
                zoom: parseInt(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM || '16', 10),
            }),
        )
        dispatch(setMapPlacePopupInfo(place))
        dispatch(closeWidget())
    }

    const handleRoute = () => {
        simple_route(
            userLocation?.lat as number,
            userLocation?.lng as number,
            place.coordinates[1],
            place.coordinates[0],
            CostingModel.Auto,
            (response: RouteResponse) => {
                // Construct a bounding box in the sw, ne format required by MapLibre. Note the lon, lat order.
                var sw = [response.trip.summary.minLon, response.trip.summary.minLat] as LngLatLike
                var ne = [response.trip.summary.maxLon, response.trip.summary.maxLat] as LngLatLike

                // Zoom to the new bounding box to focus on the route,
                // with a 50px padding around the edges. See https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#fitbounds
                mainMap?.fitBounds([sw, ne], { padding: { top: 50, bottom: 50, left: 50, right: 562 } })

                // For each leg of the trip...
                response.trip.legs.forEach(function (leg, idx) {
                    // Add a layer with the route polyline as an overlay on the map
                    var layerID = 'leg-' + idx // Unique ID with request ID and leg index
                    // Note: Our polylines have 6 digits of precision, not 5
                    var geometry = polyline.toGeoJSON(leg.shape, 6)
                    const source = mainMap?.getSource('route-source') as GeoJSONSource
                    source.setData(geometry)
                })
            },
        )
    }

    return (
        <div className="flex flex-col gap-y-2">
            <Link href={`places/${place.id}`} className="link-black flex flex-col gap-y-2" target="_blank">
                <div className="w-full">
                    <PlacePreviewCover
                        cover={place.cover}
                        title={place.title}
                        imageVariant={ImageVariant.PUBLIC}
                        size={80}
                        className="aspect-video w-full rounded-lg"
                    />
                </div>
                <div className="break-words font-medium">{place.title}</div>
            </Link>
            <div className="flex items-center justify-between">
                <PlacePreviewRating {...place} />
                <div className="flex gap-x-1">
                    <FormButton
                        type="stroke"
                        size="small"
                        icon={<PinIcon16 />}
                        className="flex-none"
                        onClick={handleShowOnMap}
                    />
                    <FormButton
                        type="stroke"
                        size="small"
                        // onClick={() => {
                        //     navigateToLocation(place.coordinates[1], place.coordinates[0])
                        // }}
                        onClick={handleRoute}
                    >
                        {t('common.action.route')}
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
