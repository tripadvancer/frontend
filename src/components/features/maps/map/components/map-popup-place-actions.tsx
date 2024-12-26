'use client'

import { BookmarkIcon } from 'lucide-react'

import { PlaceButtonRoute } from '@/components/features/maps/place-route-button/place-route-button'
import { FormButton } from '@/components/ui/form-button'
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
                icon={place.isSaved ? <BookmarkIcon size={16} fill="currentColor" /> : <BookmarkIcon size={16} />}
                className="flex-none"
                onClick={savePlace}
            />
            <PlaceButtonRoute lngLat={arrayToLngLat(place.coordinates)} />
        </div>
    )
}
