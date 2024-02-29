'use client'

import { useCallback } from 'react'
import { MapEvent, MapLayerMouseEvent, MapLayerTouchEvent, ViewStateChangeEvent } from 'react-map-gl'

import type { IPlacePreview } from '@/utils/types/place'

import {
    closePopups,
    getLocationPopupInfo,
    getMapViewState,
    getPlacePopupInfo,
    setLocationPopupInfo,
    setMapBounds,
    setMapViewState,
    setPlacePopupInfo,
} from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const useMapEventHandlers = () => {
    const dispatch = useAppDispatch()
    const viewState = useAppSelector(getMapViewState)
    const placePopupInfo = useAppSelector(getPlacePopupInfo)
    const locationPopupInfo = useAppSelector(getLocationPopupInfo)

    /**
     * This function is called when the map is loaded.
     * It adds the places layer to the map and loads the places.
     */
    const handleLoad = useCallback(
        (event: MapEvent) => {
            const map = event.target

            if (!map.hasImage('pin-orange')) {
                const pinOrangeImage = new Image()
                pinOrangeImage.src = '/images/pin-orange.svg'
                pinOrangeImage.onload = () => map.addImage('pin-orange', pinOrangeImage)
            }

            if (!map.hasImage('pin-blue')) {
                const pinBlueImage = new Image()
                pinBlueImage.src = '/images/pin-blue.svg'
                pinBlueImage.onload = () => map.addImage('pin-blue', pinBlueImage)
            }

            if (!map.hasImage('pin-gray')) {
                const pinGrayImage = new Image()
                pinGrayImage.src = '/images/pin-gray.svg'
                pinGrayImage.onload = () => map.addImage('pin-gray', pinGrayImage)
            }

            const mapBounds = map.getBounds()
            dispatch(setMapBounds(mapBounds))
        },
        [dispatch],
    )

    /**
     * This function is called when the map is moved.
     * It updates the map viewState state.
     */
    const handleMove = useCallback(
        (event: ViewStateChangeEvent) => {
            dispatch(setMapViewState(event.viewState))
        },
        [dispatch],
    )

    /**
     * This function is called when the map is moved.
     * It updates the bounds state.
     */
    const handleMoveEnd = useCallback(
        (event: ViewStateChangeEvent) => {
            const map = event.target
            const mapBounds = map.getBounds()
            dispatch(setMapBounds(mapBounds))
        },
        [dispatch],
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
                } else {
                    if (placePopupInfo || locationPopupInfo) {
                        dispatch(closePopups())
                        return
                    }

                    const coordinates = event.lngLat
                    dispatch(setLocationPopupInfo({ coordinates }))
                }
            }

            event.originalEvent.stopPropagation()
        },
        [dispatch, locationPopupInfo, placePopupInfo],
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

    return {
        ...viewState,
        placePopupInfo,
        locationPopupInfo,
        onLoad: handleLoad,
        onMove: handleMove,
        onDragEnd: handleMoveEnd,
        onZoomEnd: handleMoveEnd,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick,
        onContextMenu: handleContextMenu,
    }
}
