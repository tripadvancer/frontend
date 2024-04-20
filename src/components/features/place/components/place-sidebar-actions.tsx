'use client'

import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon24, BookmarkIcon24, PinIcon24, RouteIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { closeWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { navigateToLocation } from '@/utils/helpers/common'
import { arrayToLngLat, getFlyToViewState } from '@/utils/helpers/maps'
import { useFavorite } from '@/utils/hooks/use-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { SavePlaceForm } from '../../save-space-form/save-space-form'

export const PlaceSidebarActions = (place: IPlace) => {
    const t = useI18n()
    const dialog = useDialog()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const supertokens = useSupertokens()
    const response = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !supertokens.isAuth })
    const favorite = useFavorite(place.id, response.data?.isFavorite)
    const lngLat = arrayToLngLat(place.location.coordinates)

    const handleShowOnMap = () => {
        const lngLat = arrayToLngLat(place.location.coordinates)
        const viewState = getFlyToViewState(lngLat)
        dispatch(setMapViewState(viewState))
        dispatch(
            setMapPlacePopupInfo({
                ...place,
                coordinates: place.location.coordinates,
                isFavorite: response.data?.isFavorite || false,
            }),
        )
        dispatch(closeWidget())
        router.push('/maps')
    }

    const handleSavePlace = () => {
        dialog.open(<SavePlaceForm />)
    }

    return (
        <div className="flex gap-x-2">
            <FormButton icon={<RouteIcon24 />} className="flex-auto" onClick={() => navigateToLocation(lngLat)}>
                {t('place.navigation')}
            </FormButton>
            <FormButton type="stroke" icon={<PinIcon24 />} className="flex-none" onClick={handleShowOnMap} />
            <FormButton
                type="stroke"
                icon={!!response.data?.isFavorite ? <BookmarkFillIcon24 /> : <BookmarkIcon24 />}
                className="flex-none"
                isLoading={favorite.isLoading}
                onClick={handleSavePlace}
            />
        </div>
    )
}
