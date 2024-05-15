'use client'

import { useMap } from 'react-map-gl/maplibre'

import Session from 'supertokens-web-js/recipe/session'

import type { IPlace, IPlacePreview, IRandomPlace } from '@/utils/types/place'

import { SignIn } from '@/components/features/auth/sign-in'
import { SavePlace } from '@/components/features/save-place/save-space'
import { useDialog } from '@/providers/dialog-provider'
import { setAppMode } from '@/redux/features/app-slice'
import { setMapPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'

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
