'use client'

import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon24, BookmarkIcon24, PinIcon24, RouteIcon24 } from '@/components/ui/icons'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { toggleWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { navigateToLocation } from '@/utils/helpers'
import { useFavorite } from '@/utils/hooks/use-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const PlaceSidebarActions = (place: IPlace) => {
    const t = useI18n()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const supertokens = useSupertokens()
    const response = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !supertokens.isAuth })
    const favorite = useFavorite(place.id, response.data?.isFavorite)

    const handleShowOnMap = () => {
        dispatch(
            setMapViewState({
                latitude: place.location.coordinates[1],
                longitude: place.location.coordinates[0],
                zoom: parseInt(process.env.NEXT_PUBLIC_MAP_FLY_TO_ZOOM || '16', 10),
            }),
        )
        dispatch(
            setMapPlacePopupInfo({
                ...place,
                coordinates: place.location.coordinates,
                isFavorite: response.data?.isFavorite || false,
                isVisited: response.data?.isVisited || false,
            }),
        )
        dispatch(toggleWidget())
        router.push('/maps')
    }

    return (
        <div className="flex gap-x-2">
            <FormButton
                icon={<RouteIcon24 />}
                className="flex-auto"
                onClick={() => navigateToLocation(place.location.coordinates[1], place.location.coordinates[0])}
            >
                {t('place.navigation')}
            </FormButton>
            <FormButton type="stroke" icon={<PinIcon24 />} className="flex-none" onClick={handleShowOnMap} />
            <FormButton
                type="stroke"
                icon={!!response.data?.isFavorite ? <BookmarkFillIcon24 /> : <BookmarkIcon24 />}
                className="flex-none"
                isLoading={favorite.isLoading}
                onClick={favorite.toggle}
            />
        </div>
    )
}
