'use client'

import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { BookmarkFillIcon24, BookmarkIcon24, PinIcon24, RouteIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { closeWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { arrayToLngLat, getFlyToViewState } from '@/utils/helpers/maps'
import { useFavorite } from '@/utils/hooks/use-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { ChooseNavigate } from '../../choose-navigate/choose-navigate'
import { PlaceSidebarAction } from './place-sidebar-action'

export const PlaceSidebarActions = (place: IPlace) => {
    const t = useI18n()
    const dialog = useDialog()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(place.location.coordinates)

    const { isAuth } = useSupertokens()
    const { data, isFetching } = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !isAuth })
    const { toggle, isLoading: isSaving } = useFavorite(place.id, data?.isFavorite)

    const handleNavigate = () => {
        dialog.open(<ChooseNavigate lngLat={lngLat} />)
    }

    const handleShowOnMap = () => {
        const lngLat = arrayToLngLat(place.location.coordinates)
        const viewState = getFlyToViewState(lngLat)
        dispatch(setMapViewState(viewState))
        dispatch(
            setMapPlacePopupInfo({
                ...place,
                coordinates: place.location.coordinates,
                isFavorite: data?.isFavorite || false,
            }),
        )
        dispatch(closeWidget())
        router.push('/maps')
    }

    return (
        <div className="flex justify-center gap-x-2">
            <PlaceSidebarAction caption={t('place.navigate')} icon={<RouteIcon24 />} onClick={handleNavigate} />
            <PlaceSidebarAction
                caption={!!data?.isFavorite ? t('place.saved') : t('place.save')}
                icon={!!data?.isFavorite ? <BookmarkFillIcon24 /> : <BookmarkIcon24 />}
                isLoading={isFetching || isSaving}
                onClick={toggle}
            />
            <PlaceSidebarAction caption={t('place.on_map')} icon={<PinIcon24 />} onClick={handleShowOnMap} />
        </div>
    )
}
