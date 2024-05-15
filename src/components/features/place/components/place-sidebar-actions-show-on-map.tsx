'use client'

import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { PinIcon24 } from '@/components/ui/icons'
import { setAppMode } from '@/redux/features/app-slice'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { setWidgetActiveTab, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { AppModes, WidgetModes, WidgetTabs } from '@/utils/enums'
import { arrayToLngLat, getFlyToViewState } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsShowOnMap = ({ place, isAuth }: { place: IPlace; isAuth: boolean }) => {
    const t = useI18n()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(place.location.coordinates)

    const { data: meta } = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !isAuth })

    const handleClick = () => {
        const viewState = getFlyToViewState(lngLat)

        dispatch(setAppMode(AppModes.MAP))
        dispatch(setWidgetMode(WidgetModes.PLACES))
        dispatch(setWidgetActiveTab(WidgetTabs.ALL))
        dispatch(setMapViewState(viewState))
        dispatch(
            setMapPlacePopupInfo({
                ...place,
                coordinates: place.location.coordinates,
                isSaved: meta?.isSaved || false,
                isVisited: meta?.isVisited || false,
            }),
        )

        router.push('/maps')
    }

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={handleClick}>
            <PinIcon24 />
            {t('place.actions.show_on_map')}
        </div>
    )
}
