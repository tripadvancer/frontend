'use client'

import { LocateFixedIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import { AppModes, WidgetModes, WidgetTabs } from '@/utils/enums'
import { arrayToLngLat, getFlyToViewState } from '@/utils/helpers/maps'
import { setAppMode } from '@/utils/redux/features/app-slice'
import { setMapPlacePopupInfo, setMapViewState } from '@/utils/redux/features/map-slice'
import { setWidgetActiveTab, setWidgetMode } from '@/utils/redux/features/widget-slice'
import { useAppDispatch } from '@/utils/redux/hooks'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { GeoJsonPoint } from '@/utils/types/geo'

type PlaceSidebarActionsShowOnMap = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    location: GeoJsonPoint
    isAuth: boolean
}

export const PlaceSidebarActionsShowOnMap = (props: PlaceSidebarActionsShowOnMap) => {
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(props.location.coordinates)

    const { data: meta } = placesAPI.useGetPlaceMetaByIdQuery(props.id, { skip: !props.isAuth })

    const handleClick = () => {
        const viewState = getFlyToViewState(lngLat)

        dispatch(setAppMode(AppModes.MAP))
        dispatch(setWidgetMode(WidgetModes.PLACES))
        dispatch(setWidgetActiveTab(WidgetTabs.ALL))
        dispatch(setMapViewState(viewState))
        dispatch(
            setMapPlacePopupInfo({
                id: props.id,
                title: props.title,
                cover: props.cover,
                avgRating: props.avgRating,
                reviewsCount: props.reviewsCount,
                coordinates: props.location.coordinates,
                isSaved: meta?.isSaved || false,
            }),
        )

        router.push('/maps')
    }

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={handleClick}>
            <LocateFixedIcon />
            {t('common.action.place.showOnMap')}
        </div>
    )
}
