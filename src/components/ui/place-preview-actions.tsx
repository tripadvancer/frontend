'use client'

import type { IPlace, IPlaceMeta } from '@/utils/types/place'

import { PlaceButtonRoute } from '@/components/features/place-button-route/place-button-route'
import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useFavorite } from '@/utils/hooks/use-favorite'

type PlacePreviewActionsProps = Pick<IPlace, 'id'> &
    Pick<IPlaceMeta, 'isFavorite'> & {
        coordinates: number[]
    }

export const PlacePreviewActions = (place: PlacePreviewActionsProps) => {
    const dispatch = useAppDispatch()
    const favorite = useFavorite(place.id, place.isFavorite, () => dispatch(closeMapPopups()))
    const lngLat = arrayToLngLat(place.coordinates)

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={place.isFavorite ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />}
                className="flex-none"
                isLoading={favorite.isLoading}
                onClick={favorite.toggle}
            />
            <PlaceButtonRoute lngLat={lngLat} />
        </div>
    )
}
