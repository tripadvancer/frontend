'use client'

import { useCallback, useEffect, useState } from 'react'
import {
    GeoJSONSource,
    Map,
    MapEvent,
    MapLayerMouseEvent,
    ViewState,
    ViewStateChangeEvent,
} from 'react-map-gl/maplibre'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { IPlacePreview } from '@/utils/types/place'

import { getPlaceByBounds } from '@/services/places'

import { createQueryString, strToViewState, viewStateToStr } from './helpers'

export const useMapEventHandlers = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [viewState, setViewState] = useState<Partial<ViewState>>({
        latitude: 54.887928,
        longitude: 25.954196,
        zoom: 5,
    })

    /**
     * This function is called when the map is loaded.
     * It adds the places layer to the map and loads the places.
     */
    const handleLoad = useCallback(async (event: MapEvent) => {
        const map = event.target

        const placePinImage = new Image()
        placePinImage.src = '/images/pin.svg'
        placePinImage.onload = () => map.addImage('place-pin', placePinImage)

        const bounds = map.getBounds()
        const places = await getPlaceByBounds({ mapBounds: bounds, selectedCategories: [] })
        const source = map.getSource('places-source') as GeoJSONSource

        if (source) {
            source.setData(places)
        }
    }, [])

    /**
     * This function is called when the map is moved.
     * It updates the map viewState state.
     */
    const handleMove = useCallback((event: ViewStateChangeEvent) => {
        setViewState(event.viewState)
    }, [])

    /**
     * This function is called when the map is moved.
     * It updates the url query string with the new map viewState.
     */
    const handleMoveEnd = useCallback(
        async (event: ViewStateChangeEvent) => {
            const vs = viewStateToStr(event.viewState)
            router.push(pathname + '?' + createQueryString('vs', vs, searchParams))

            const map = event.target
            const bounds = map.getBounds()
            const places = await getPlaceByBounds({ mapBounds: bounds, selectedCategories: [] })
            const source = map.getSource('places-source') as GeoJSONSource

            if (source) {
                source.setData(places)
            }
        },
        [pathname, router, searchParams],
    )

    /**
     * This function is called when the mouse enters a feature on the map.
     * It changes the cursor to a pointer.
     */
    const handleMouseEnter = useCallback((event: MapLayerMouseEvent) => {
        const map = event.target
        map.getCanvas().style.cursor = 'pointer'
    }, [])

    /**
     * This function is called when the mouse leaves a feature on the map.
     * It changes the cursor back to the default.
     */
    const handleMouseLeave = useCallback((event: MapLayerMouseEvent) => {
        const map = event.target
        map.getCanvas().style.cursor = ''
    }, [])

    /**
     * This function is called when the mouse clicks a feature on the map.
     * It popup a modal with the place details.
     */
    const handleClick = useCallback((event: MapLayerMouseEvent) => {
        if (event.features) {
            const feature = event.features[0]
            if (feature) {
                const place = feature.properties as IPlacePreview
                alert(place.title)
            }
        }

        event.originalEvent.stopPropagation()
    }, [])

    /**
     * This function is called when the map is loaded.
     * It updates the map viewState state from the url query string.
     */
    useEffect(() => {
        const vs = searchParams.get('vs')

        if (vs) {
            const updatedViewState = strToViewState(vs)
            setViewState(updatedViewState)
        } else {
            const updatedVs = viewStateToStr(viewState)
            router.push(pathname + '?' + createQueryString('vs', updatedVs, searchParams))
        }
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
