'use client'

import { useMap } from 'react-map-gl/maplibre'

import type { IPlacePreview } from '@/utils/types/place'

import { setAppMode } from '@/redux/features/app-slice'
import { setMapPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'

import { AppModes } from '../enums'
import { arrayToLngLat, getMapFlyToOptions } from '../helpers/maps'

interface useShowOnMapInterface {
    onShowOnMap: () => void
}

export function useShowOnMap(place: IPlacePreview): useShowOnMapInterface {
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(place.coordinates)

    const { map } = useMap()

    const onShowOnMap = async (): Promise<void> => {
        dispatch(setAppMode(AppModes.MAP))
        dispatch(setMapPlacePopupInfo(place))
        map?.flyTo(getMapFlyToOptions(lngLat))
    }

    return { onShowOnMap }
}
