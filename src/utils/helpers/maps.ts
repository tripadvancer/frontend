import { isMobile } from 'react-device-detect'
import type { PaddingOptions, ViewState } from 'react-map-gl/maplibre'

import { FlyToOptions } from 'maplibre-gl'

import type { LngLat } from '@/utils/types/geo'

export function stringCoordinatesIsValid(stringCoordinates: string): boolean {
    const reg = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)(\s*,\s*|\s+)([-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?))$/
    return reg.test(stringCoordinates)
}

export const arrayToLngLat = (coordinates: number[]): LngLat => {
    return {
        lng: Number(coordinates[0].toFixed(6)),
        lat: Number(coordinates[1].toFixed(6)),
    }
}

export const LngLatToArray = (coordinates: LngLat): number[] => {
    return [Number(coordinates.lng.toFixed(6)), Number(coordinates.lat.toFixed(6))]
}

export const stringToLngLat = (coordinates: string): LngLat => {
    const [lat, lng] = coordinates.split(/[\s,]+/)

    return {
        lng: Number(parseFloat(lng).toFixed(6)),
        lat: Number(parseFloat(lat).toFixed(6)),
    }
}

export const LngLatToString = (coordinates: LngLat): string => {
    return `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`
}

export const arrayToString = (coordinates: number[]): string => {
    const lngLat = arrayToLngLat(coordinates)
    return `${lngLat.lat}, ${lngLat.lng}`
}

export const stringToArray = (coordinates: string): number[] => {
    const lngLat = stringToLngLat(coordinates)
    return [lngLat.lng, lngLat.lat]
}

export function stringToViewState(coordinates: string): Partial<ViewState> {
    const lngLat = stringToLngLat(coordinates)

    return {
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        zoom: parseInt(process.env.NEXT_PUBLIC_MAP_FLY_TO_ZOOM as string),
        pitch: 0,
        bearing: 0,
    }
}

export const viewStateToString = (viewState: Partial<ViewState>): string => {
    return `${viewState.latitude?.toFixed(6)}, ${viewState.longitude?.toFixed(6)}`
}

export function getDefaultViewState(): Partial<ViewState> {
    return {
        longitude: parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG as string),
        latitude: parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT as string),
        zoom: parseInt(process.env.NEXT_PUBLIC_MAP_ZOOM as string),
        pitch: 0,
        bearing: 0,
    }
}

export function getFlyToViewState(lngLat: LngLat): Partial<ViewState> {
    return {
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        zoom: parseInt(process.env.NEXT_PUBLIC_MAP_FLY_TO_ZOOM || '14', 10),
        pitch: 0,
        bearing: 0,
    }
}

export function getMapFlyToOptions(lngLat: LngLat): FlyToOptions {
    return {
        center: lngLat,
        zoom: getMapFlyToZoom(),
        essential: true,
    }
}

export function getMapFlyToZoom(): number {
    return parseInt(process.env.NEXT_PUBLIC_MAP_FLY_TO_ZOOM || '12', 10)
}

export function getBoundsFromCoordinates(coordinates: number[][]): [[number, number], [number, number]] {
    return coordinates.reduce(
        (acc, place) => {
            const lngLat = arrayToLngLat(place)
            return [
                [Math.min(acc[0][0], lngLat.lng), Math.min(acc[0][1], lngLat.lat)],
                [Math.max(acc[1][0], lngLat.lng), Math.max(acc[1][1], lngLat.lat)],
            ]
        },
        [
            [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
            [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
        ],
    ) as [[number, number], [number, number]]
}
