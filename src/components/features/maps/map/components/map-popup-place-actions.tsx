'use client'

import { PlaceButtonRoute } from '@/components/features/maps/place-route-button/place-route-button'
import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16 } from '@/components/ui/icons'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSavePlace } from '@/utils/hooks/use-save-place'

type MapPopupPlaceActionsProps = {
    id: number
    isSaved: boolean
    coordinates: number[]
}

export const MapPopupPlaceActions = (place: MapPopupPlaceActionsProps) => {
    const { savePlace } = useSavePlace(place.id)

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={place.isSaved ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />}
                className="flex-none"
                onClick={savePlace}
            />
            <PlaceButtonRoute lngLat={arrayToLngLat(place.coordinates)} />
        </div>
    )
}
