'use client'

import { useMap } from 'react-map-gl/maplibre'

import { setAppMode } from '@/redux/features/app-slice'
import { setMapPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { IPlacePreview, IRandomPlace } from '@/utils/types/place'

import { AppModes } from '../enums'
import { arrayToLngLat, getMapFlyToOptions } from '../helpers/maps'

interface useShowOnMapInterface {
    showOnMap: () => void
}

export function useShowOnMap(place: IPlacePreview | IRandomPlace): useShowOnMapInterface {
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(place.coordinates)

    const { map } = useMap()

    const showOnMap = async (): Promise<void> => {
        dispatch(setAppMode(AppModes.MAP))
        dispatch(setMapPlacePopupInfo(place))
        map?.flyTo(getMapFlyToOptions(lngLat))
    }

    return { showOnMap }
}
