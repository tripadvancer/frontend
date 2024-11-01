'use client'

import { useCallback, useRef, useState } from 'react'
import { MapRef, Map as ReactMapGl, ViewState, ViewStateChangeEvent } from 'react-map-gl/maplibre'

import Image from 'next/image'

import { LocationIcon16, MinusIcon16, PlusIcon16, SearchIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'
import { LngLat } from '@/utils/types/geo'

import { LocationPickerMapSearch } from './location-picker-map-search'

type LocationPickerMapProps = {
    viewState: Partial<ViewState>
    onChangeViewState: (viewState: Partial<ViewState>) => void
}

export const LocationPickerMap = ({ viewState, onChangeViewState }: LocationPickerMapProps) => {
    const mapRef = useRef<MapRef>(null)

    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)
    const [isMoving, setIsMoving] = useState<boolean>(false)
    const [isUserLocating, setIsUserLocating] = useState<boolean>(false)

    const handleUserLocate = () => {
        if ('geolocation' in navigator) {
            setIsUserLocating(true)
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                const lngLat: LngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
                mapRef.current?.jumpTo({
                    center: lngLat,
                    zoom: 15,
                })
                setIsUserLocating(false)
            })
        }
    }

    const handleSearchResultSelect = useCallback((lngLat: LngLat) => {
        mapRef.current?.jumpTo({
            center: lngLat,
            zoom: 15,
        })
    }, [])

    const handleMove = useCallback((event: ViewStateChangeEvent) => {
        onChangeViewState(event.viewState)
    }, [])

    const handleMoveStart = useCallback(() => {
        setIsMoving(true)
    }, [])

    const handleMoveEnd = useCallback(() => {
        setIsMoving(false)
    }, [])

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    return (
        <ReactMapGl
            ref={mapRef}
            id="locationPickerMap"
            initialViewState={viewState}
            mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
            attributionControl={false}
            onMove={handleMove}
            onMoveStart={handleMoveStart}
            onMoveEnd={handleMoveEnd}
        >
            <div className="absolute left-2 right-2 top-2 z-10 sm:right-auto">
                {isSearchVisible ? (
                    <LocationPickerMapSearch
                        onSelect={handleSearchResultSelect}
                        onHide={() => setIsSearchVisible(false)}
                    />
                ) : (
                    <MapControl onClick={() => setIsSearchVisible(true)}>
                        <SearchIcon16 />
                    </MapControl>
                )}
            </div>

            <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-y-1">
                <MapControl desktopOnly onClick={handleZoomIn}>
                    <PlusIcon16 />
                </MapControl>

                <MapControl desktopOnly onClick={handleZoomOut}>
                    <MinusIcon16 />
                </MapControl>

                <MapControl isLoading={isUserLocating} onClick={handleUserLocate}>
                    <LocationIcon16 />
                </MapControl>
            </div>

            <Image
                src="/images/location-picker/location-picker-pin-shadow.svg"
                width={27}
                height={41}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[13.5px] -translate-y-[36px]"
                alt=""
            />

            <Image
                src="/images/location-picker/location-picker-pin.svg"
                width={27}
                height={41}
                alt=""
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[13.5px] -translate-y-[36px]"
                style={{ marginTop: isMoving ? -8 : 0 }}
            />
        </ReactMapGl>
    )
}
