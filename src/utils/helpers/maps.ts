import type { ViewState } from 'react-map-gl'

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

export function stringToViewState(coordinates: string): ViewState {
    const lngLat = stringToLngLat(coordinates)

    return {
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        zoom: parseInt(process.env.NEXT_PUBLIC_MAP_FLY_TO_ZOOM as string),
        pitch: 0,
        bearing: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
    }
}

export const viewStateToString = (viewState: ViewState): string => {
    return `${viewState.latitude?.toFixed(6)}, ${viewState.longitude?.toFixed(6)}`
}

export function getDefaultViewState(): ViewState {
    return {
        longitude: parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG as string),
        latitude: parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT as string),
        zoom: parseInt(process.env.NEXT_PUBLIC_MAP_ZOOM as string),
        pitch: 0,
        bearing: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
    }
}

export function getFlyToViewState(lngLat: LngLat): ViewState {
    return {
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        zoom: parseInt(process.env.NEXT_PUBLIC_MAP_FLY_TO_ZOOM || '14', 10),
        pitch: 0,
        bearing: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
    }
}
