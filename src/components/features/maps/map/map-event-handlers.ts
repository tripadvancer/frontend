'use client'

import { useCallback } from 'react'
import { LngLat, MapEvent, MapLayerMouseEvent, ViewStateChangeEvent } from 'react-map-gl/maplibre'

import {
    closeMapPopups,
    getMapState,
    setMapBounds,
    setMapLocationPopupInfo,
    setMapPlacePopupInfo,
    setMapViewState,
} from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const useMapEventHandlers = () => {
    const dispatch = useAppDispatch()
    const mapState = useAppSelector(getMapState)

    const showLocationPopup = useCallback(
        (lngLat: LngLat) => {
            const lat = Number(lngLat.lat.toFixed(6))
            const lng = Number(lngLat.lng.toFixed(6))
            dispatch(setMapLocationPopupInfo({ coordinates: { lat, lng } }))
        },
        [dispatch],
    )

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

                    const place = { ...feature.properties, coordinates } as {
                        id: number
                        title: string
                        cover: string | null
                        avgRating: number | null
                        reviewsCount: number
                        isSaved: boolean
                        coordinates: number[]
                    }
                    dispatch(setMapPlacePopupInfo(place))
                } else {
                    if (mapState.placePopupInfo || mapState.locationPopupInfo) {
                        dispatch(closeMapPopups())
                        return
                    }

                    showLocationPopup(event.lngLat.wrap())
                }
            }

            event.originalEvent.stopPropagation()
        },
        [dispatch, mapState, showLocationPopup],
    )

    /**
     * This function is called when the mouse right clicks on the map.
     * It popup a modal with the location details.
     */
    const handleContextMenu = useCallback(
        (event: MapLayerMouseEvent) => {
            showLocationPopup(event.lngLat.wrap())
            event.originalEvent.stopPropagation()
        },
        [showLocationPopup],
    )

    return {
        placePopupInfo: mapState.placePopupInfo,
        locationPopupInfo: mapState.locationPopupInfo,
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
