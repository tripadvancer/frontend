'use client'

import { useCallback, useEffect, useState } from 'react'
import {
    GeoJSONSource,
    Layer,
    Map as MapBox,
    MapEvent,
    MapLayerMouseEvent,
    Source,
    ViewState,
    ViewStateChangeEvent,
} from 'react-map-gl'

import { useRouter, useSearchParams } from 'next/navigation'

import { IPlacePreview } from '@/utils/types/place'

import { getPlaceByBounds } from '@/services/places'

import { strToViewState, viewStateToStr } from '../_utils/helpers'
import { placesLayer } from '../_utils/layers'

const defaultViewState: ViewState = {
    latitude: 54.887928,
    longitude: 25.954196,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
}

export const Map = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [viewState, setViewState] = useState<ViewState>(defaultViewState)

    useEffect(() => {
        const vs = searchParams.get('vs')

        if (vs) {
            const updatedViewState = strToViewState(vs)
            setViewState(updatedViewState)
            return
        }

        const updatedQuery = viewStateToStr(viewState)
        router.replace(`/maps?vs=${updatedQuery}`)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleLoad = useCallback(async (event: MapEvent) => {
        const map = event.target
        const bounds = map.getBounds()
        const source = map.getSource('places-source') as GeoJSONSource
        const places = await getPlaceByBounds({ mapBounds: bounds, selectedCategories: [] })

        source.setData(places)

        const placePinImage = new Image()
        placePinImage.src = '/images/pin.svg'
        placePinImage.onload = () => map.addImage('place-pin', placePinImage)
    }, [])

    const handleMoveEnd = useCallback(
        async (event: ViewStateChangeEvent) => {
            const vs = viewStateToStr(event.viewState)
            const map = event.target
            const bounds = map.getBounds()
            const source = map.getSource('places-source') as GeoJSONSource
            const places = await getPlaceByBounds({ mapBounds: bounds, selectedCategories: [] })

            source.setData(places)
            router.replace(`/maps?vs=${vs}`)
        },
        [router],
    )

    const handleMove = useCallback((event: ViewStateChangeEvent) => {
        setViewState(event.viewState)
    }, [])

    const handleMouseEnter = useCallback((event: MapLayerMouseEvent) => {
        event.target.getCanvas().style.cursor = 'pointer'
    }, [])

    const handleMouseLeave = useCallback((event: MapLayerMouseEvent) => {
        event.target.getCanvas().style.cursor = ''
    }, [])

    const handleClick = useCallback((event: MapLayerMouseEvent) => {
        if (event.features) {
            const feature = event.features[0]
            if (feature) {
                const place = feature.properties as IPlacePreview
                // open popup
            }
        }

        event.originalEvent.stopPropagation()
    }, [])

    return (
        <div className="h-screen w-screen">
            <MapBox
                {...viewState}
                id="map"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                interactiveLayerIds={[placesLayer.id]}
                onLoad={handleLoad}
                onMove={handleMove}
                onMoveEnd={handleMoveEnd}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                reuseMaps
            >
                <Source id="places-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
                    <Layer {...placesLayer} />
                </Source>
            </MapBox>
        </div>
    )
}
