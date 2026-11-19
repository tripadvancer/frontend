'use client'

import { useMap } from 'react-map-gl/maplibre'

import { useRouter } from 'next/navigation'

import { useAppSettings } from '@/components/providers/settings-provider'
import { setAppMode } from '@/utils/redux/features/app-slice'
import { setMapPlacePopupInfo, setMapViewState } from '@/utils/redux/features/map-slice'
import { setWidgetActiveTab, setWidgetMode } from '@/utils/redux/features/widget-slice'
import { useAppDispatch } from '@/utils/redux/hooks'

import { AppModes, WidgetModes, WidgetTabs } from '../enums'
import { arrayToLngLat, getFlyToViewState, getMapFlyToOptions } from '../helpers/maps'

interface useShowOnMapInterface {
    showOnMap: () => void
}

type useShowOnMapProps = {
    id: number
    title: string
    cover: string | null
    countryCode: string | null
    avgRating: number | null
    reviewsCount: number
    isSaved: boolean
    coordinates: number[]
}

export function useShowOnMap(props: useShowOnMapProps): useShowOnMapInterface {
    const settings = useAppSettings()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const lngLat = arrayToLngLat(props.coordinates)

    const { map } = useMap()

    const showOnMap = (): void => {
        if (!settings) {
            return
        }

        dispatch(setAppMode(AppModes.MAP))
        dispatch(setMapPlacePopupInfo(props))

        if (map) {
            // If the map is available, fly to the coordinates
            map.flyTo(getMapFlyToOptions(lngLat, settings.map.flyToZoom))
        } else {
            // If the map is not available, set the view state directly
            const viewState = getFlyToViewState(lngLat, settings.map.flyToZoom)

            dispatch(setWidgetMode(WidgetModes.PLACES))
            dispatch(setWidgetActiveTab(WidgetTabs.ALL))
            dispatch(setMapViewState(viewState))
            router.push('/maps')
        }
    }

    return { showOnMap }
}
