import { useCallback, useEffect, useState } from 'react'
import { MapEvent, MapLayerMouseEvent, ViewState, ViewStateChangeEvent, useMap } from 'react-map-gl/maplibre'

import { useRouter, useSearchParams } from 'next/navigation'

import type { IPlacePreview } from '@/utils/types/place'

import { getPlaceByBounds } from '@/services/places'

import { strToViewState, viewStateToStr } from '../_utils/helpers'
import { placesLayer } from '../_utils/layers'

export const useMapEventHandlers = () => {
    const { mainMap } = useMap()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [viewState, setViewState] = useState<ViewState>({
        latitude: 54.887928,
        longitude: 25.954196,
        zoom: 5,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
    })

    const handleLoad = useCallback(async (event: MapEvent) => {
        const map = event.target
        const bounds = map.getBounds()
        const data = await getPlaceByBounds({ mapBounds: bounds, selectedCategories: [] })
        map.addSource('places-source', { type: 'geojson', data }).addLayer(placesLayer)
        handleLoadImage(event)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleLoadImage = useCallback((event: MapEvent) => {
        const map = event.target
        const placePinImage = new Image()
        placePinImage.src = '/images/pin-orange.png'
        placePinImage.onload = () => map.addImage('place-pin', placePinImage)
    }, [])

    const handleMove = useCallback((event: ViewStateChangeEvent) => {
        setViewState(event.viewState)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleMoveEnd = async (event: ViewStateChangeEvent) => {
        const vs = viewStateToStr(event.viewState)
        const map = mainMap?.getMap()

        if (!mainMap) return

        const bounds = mainMap.getBounds()
        const source = mainMap.getSource('places-source')
        const places = await getPlaceByBounds({ mapBounds: bounds, selectedCategories: [] })
        // source?.setData(places)
        router.replace(`/maps?vs=${vs}`)
    }

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

    return {
        ...viewState,
        onLoad: handleLoad,
        onMove: handleMove,
        onMoveEnd: handleMoveEnd,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick,
    }
}
