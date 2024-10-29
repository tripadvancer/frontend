'use client'

import { useMap } from 'react-map-gl/maplibre'

import { setAppMode } from '@/redux/features/app-slice'
import { setMapPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'

import { AppModes } from '../enums'
import { arrayToLngLat, getMapFlyToOptions } from '../helpers/maps'

interface useShowOnMapInterface {
    showOnMap: () => void
}

type useShowOnMapProps = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    isSaved: boolean
    coordinates: number[]
}

export function useShowOnMap(props: useShowOnMapProps): useShowOnMapInterface {
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(props.coordinates)

    const { map } = useMap()

    const showOnMap = async (): Promise<void> => {
        dispatch(setAppMode(AppModes.MAP))
        dispatch(setMapPlacePopupInfo(props))
        map?.flyTo(getMapFlyToOptions(lngLat))
    }

    return { showOnMap }
}
