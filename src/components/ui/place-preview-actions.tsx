import type { IPlacePreview } from '@/utils/types/place'

import { FormButtonStroke } from '@/components/ui/form-button-stroke'
import { PlaceFavoriteButton } from '@/components/ui/place-favorite-button'

export const PlacePreviewActions = (place: IPlacePreview) => {
    return (
        <div className="flex gap-x-1">
            <PlaceFavoriteButton size="small" id={place.id} isFavorite={place.isFavorite} />
            <FormButtonStroke size="small">Route</FormButtonStroke>
        </div>
    )
}
