'use client'

import type { IPlace, IPlaceMeta } from '@/utils/types/place'

import { PlaceButtonRoute } from '@/components/features/place-button-route/place-button-route'
import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSavePlace } from '@/utils/hooks/use-save-place'

// prettier-ignore
type PlacePreviewActionsProps = Pick<IPlace, 'id'> & Pick<IPlaceMeta, 'isSaved'> & {
    coordinates: number[]
}

export const PlacePreviewActions = (place: PlacePreviewActionsProps) => {
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(place.coordinates)

    const { toggle } = useSavePlace(place.id, () => dispatch(closeMapPopups()))

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={place.isSaved ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />}
                className="flex-none"
                onClick={toggle}
            />
            <PlaceButtonRoute lngLat={lngLat} />
        </div>
    )
}
