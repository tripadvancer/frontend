import type { ViewState } from 'react-map-gl'

import type { ICoordinates } from '@/utils/types/geo'

export function stringToCoordinates(value: string): ICoordinates {
    const [lat, lng] = value.split(/[\s,]+/)
    return {
        lng: Number(parseFloat(lng).toFixed(6)),
        lat: Number(parseFloat(lat).toFixed(6)),
    }
}

export const coordinatesToString = (coordinates: ICoordinates): string => {
    return `${coordinates.lat}, ${coordinates.lng}`
}

export function getDefaultViewState(): Partial<ViewState> {
    return {
        longitude: parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG as string),
        latitude: parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT as string),
        zoom: parseInt(process.env.NEXT_PUBLIC_MAP_ZOOM as string),
    }
}
