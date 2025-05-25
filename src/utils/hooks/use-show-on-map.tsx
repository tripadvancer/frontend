'use client'

import { useMap } from 'react-map-gl/maplibre'

import { useRouter } from 'next/navigation'

import { setAppMode } from '@/redux/features/app-slice'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { setWidgetActiveTab, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'

import { AppModes, WidgetModes, WidgetTabs } from '../enums'
import { arrayToLngLat, getFlyToViewState, getMapFlyToOptions } from '../helpers/maps'

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
    const router = useRouter()
    const lngLat = arrayToLngLat(props.coordinates)

    const { map } = useMap()

    const showOnMap = (): void => {
        dispatch(setAppMode(AppModes.MAP))
        dispatch(setMapPlacePopupInfo(props))

        if (map) {
            // If the map is available, fly to the coordinates
            map.flyTo(getMapFlyToOptions(lngLat))
        } else {
            // If the map is not available, set the view state directly
            const viewState = getFlyToViewState(lngLat)

            dispatch(setWidgetMode(WidgetModes.PLACES))
            dispatch(setWidgetActiveTab(WidgetTabs.ALL))
            dispatch(setMapViewState(viewState))
            router.push('/maps')
        }
    }

    return { showOnMap }
}
