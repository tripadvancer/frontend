'use client'

import { useCallback, useEffect } from 'react'
import { GeoJSONSource, MapEvent, MapLayerMouseEvent, ViewStateChangeEvent, useMap } from 'react-map-gl/maplibre'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { IPlacePreview } from '@/utils/types/place'

import {
    closePopups,
    getLocationPopupInfo,
    getPlacePopupInfo,
    getSelectedCategories,
    getViewState,
    setLocationPopupInfo,
    setPlacePopupInfo,
    setViewState,
} from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getPlaceByBounds } from '@/services/places'

export const useMapEventHandlers = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const selectedCategories = useAppSelector(getSelectedCategories)
    const viewState = useAppSelector(getViewState)
    const placePopupInfo = useAppSelector(getPlacePopupInfo)
    const locationPopupInfo = useAppSelector(getLocationPopupInfo)

    const { mainMap } = useMap()

    /**
     * This function is updated source data.
     */
    const updateSourceData = useCallback(
        async (map: any): Promise<void> => {
            if (map) {
                const mapBounds = map.getBounds()
                const places = await getPlaceByBounds({ mapBounds, selectedCategories })
                const source = map.getSource('places-source') as GeoJSONSource

                if (source) {
                    source.setData(places)
                }
            }
        },
        [selectedCategories],
    )

    useEffect(() => {
        updateSourceData(mainMap)
    }, [selectedCategories]) // eslint-disable-line react-hooks/exhaustive-deps

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
    const handleMove = useCallback(
        (event: ViewStateChangeEvent) => {
            dispatch(setViewState(event.viewState))
        },
        [dispatch],
    )

    /**
     * This function is called when the map is moved.
     * It updates the data source.
     */
    const handleDragEnd = useCallback(
        async (event: ViewStateChangeEvent) => {
            updateSourceData(event.target)
        },
        [updateSourceData],
    )

    /**
     * This function is called when the map is zoomed.
     * It updates the data source.
     */
    const handleZoomEnd = useCallback(
        async (event: ViewStateChangeEvent) => {
            updateSourceData(event.target)
        },
        [updateSourceData],
    )

    /**
     * This function is called when the mouse enters a feature on the map.
     * It changes the cursor to a pointer.
     */
    const handleMouseEnter = useCallback((event: MapLayerMouseEvent) => {
        event.target.getCanvas().style.cursor = 'pointer'
    }, [])

    /**
     * This function is called when the mouse leaves a feature on the map.
     * It changes the cursor back to the default.
     */
    const handleMouseLeave = useCallback((event: MapLayerMouseEvent) => {
        event.target.getCanvas().style.cursor = ''
    }, [])

    /**
     * This function is called when the mouse clicks a feature on the map.
     * It popup a modal with the place details.
     */
    const handleClick = useCallback(
        (event: MapLayerMouseEvent) => {
            dispatch(closePopups())

            if (event.features) {
                const feature = event.features[0]
                if (feature) {
                    // @ts-ignore
                    const coordinates = feature.geometry.coordinates.slice()

                    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    const place = { ...feature.properties, coordinates } as IPlacePreview
                    dispatch(setPlacePopupInfo(place))
                }
            }

            event.originalEvent.stopPropagation()
        },
        [dispatch],
    )

    /**
     * This function is called when the mouse right clicks on the map.
     * It popup a modal with the location details.
     */
    const handleContextMenu = useCallback(
        (event: MapLayerMouseEvent) => {
            const coordinates = event.lngLat
            dispatch(setLocationPopupInfo({ coordinates }))
            event.originalEvent.stopPropagation()
        },
        [dispatch],
    )

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
        onDragEnd: handleDragEnd,
        onZoomEnd: handleZoomEnd,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick,
        onContextMenu: handleContextMenu,
    }
}
