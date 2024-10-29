'use client'

import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import { PinIcon24 } from '@/components/ui/icons'
import { setAppMode } from '@/redux/features/app-slice'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { setWidgetActiveTab, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { AppModes, WidgetModes, WidgetTabs } from '@/utils/enums'
import { arrayToLngLat, getFlyToViewState } from '@/utils/helpers/maps'
import { IPlace } from '@/utils/types/place'

export const PlaceSidebarActionsShowOnMap = ({ place, isAuth }: { place: IPlace; isAuth: boolean }) => {
    const t = useTranslations()
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
            }),
        )

        router.push('/maps')
    }

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={handleClick}>
            <PinIcon24 />
            {t('common.action.place.showOnMap')}
        </div>
    )
}
