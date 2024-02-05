'use client'

import { useCallback, useEffect, useState } from 'react'
import { GeoJSONSource, MapEvent, MapLayerMouseEvent, ViewState, ViewStateChangeEvent } from 'react-map-gl/maplibre'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { CoordinatesTuple } from '@/utils/types/geo'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'

import { getSelectedCategories } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'
import { getPlaceByBounds } from '@/services/places'

export const useMapEventHandlers = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const selectedCategories = useAppSelector(getSelectedCategories)

    const [viewState, setViewState] = useState<Partial<ViewState>>({
        latitude: 54.887928,
        longitude: 25.954196,
        zoom: 5,
    })

    const [placePopupInfo, setPlacePopupInfo] = useState<IPlacePreview | null>(null)
    const [locationPopupInfo, setLocationPopupInfo] = useState<ILocationPreview | null>(null)

    useEffect(() => {
        console.log('Selected categories will be updated')
        router.refresh()
    }, [router, selectedCategories])

    /**
     * This function is called when the map is loaded.
     * It adds the places layer to the map and loads the places.
     */
    const handleLoad = useCallback(
        async (event: MapEvent) => {
            const map = event.target

            const pinOrangeImage = new Image()
            pinOrangeImage.src = '/images/pin-orange.svg'
            pinOrangeImage.onload = () => map.addImage('pin-orange', pinOrangeImage)

            const pinBlueImage = new Image()
            pinBlueImage.src = '/images/pin-blue.svg'
            pinBlueImage.onload = () => map.addImage('pin-blue', pinBlueImage)

            const pinGrayImage = new Image()
            pinGrayImage.src = '/images/pin-gray.svg'
            pinGrayImage.onload = () => map.addImage('pin-gray', pinGrayImage)

            const mapBounds = map.getBounds()
            const places = await getPlaceByBounds({ mapBounds, selectedCategories })
            const source = map.getSource('places-source') as GeoJSONSource

            if (source) {
                source.setData(places)
            }
        },
        [selectedCategories],
    )

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
            // const vs = viewStateToStr(event.viewState)
            // router.replace(pathname + '?' + createQueryString('vs', vs, searchParams))

            const map = event.target
            const mapBounds = map.getBounds()
            const places = await getPlaceByBounds({ mapBounds, selectedCategories })
            const source = map.getSource('places-source') as GeoJSONSource

            if (source) {
                source.setData(places)
            }
        },
        [selectedCategories],
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
        setPlacePopupInfo(null)
        setLocationPopupInfo(null)

        if (event.features) {
            const feature = event.features[0]
            if (feature) {
                const coordinates = JSON.parse(feature.properties.coordinates)
                const place = { ...feature.properties, coordinates } as IPlacePreview
                setPlacePopupInfo(place)
            }
        }

        event.originalEvent.stopPropagation()
    }, [])

    const handleContextMenu = useCallback((event: MapLayerMouseEvent) => {
        const coordinates = [event.lngLat.lat, event.lngLat.lng] as CoordinatesTuple
        setPlacePopupInfo(null)
        setLocationPopupInfo({ coordinates })
        event.originalEvent.stopPropagation()
    }, [])

    /**
     * This function is called when the map is loaded.
     * It updates the map viewState state from the url query string.
     */
    // useEffect(() => {
    //     const vs = searchParams.get('vs')

    //     if (vs) {
    //         const updatedViewState = strToViewState(vs)
    //         setViewState(updatedViewState)
    //     } else {
    //         const updatedVs = viewStateToStr(viewState)
    //         router.replace(pathname + '?' + createQueryString('vs', updatedVs, searchParams))
    //     }
    // }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return {
        ...viewState,
        placePopupInfo,
        locationPopupInfo,
        onLoad: handleLoad,
        onMove: handleMove,
        onMoveEnd: handleMoveEnd,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick,
        onContextMenu: handleContextMenu,
    }
}
