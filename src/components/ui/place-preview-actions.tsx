import type { IPlacePreview } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { closePopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { navigateToLocation } from '@/utils/helpers'
import { useToggleFavorite } from '@/utils/hooks/use-toggle-favorite'

export const PlacePreviewActions = (place: IPlacePreview) => {
    const dispatch = useAppDispatch()

    const { isLoading, toggleFavorite } = useToggleFavorite(place.id, place.isFavorite, () => dispatch(closePopups()))

    const handleNavigateToLocation = () => {
        navigateToLocation(place.coordinates[1], place.coordinates[0])
    }

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={
                    // prettier-ignore
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d={place.isFavorite ? 'M2 16L8 13L14 16V2C14 0.89543 13.1046 0 12 0H4C2.89543 0 2 0.89543 2 2V16Z' : 'M2 16L8 13L14 16V2C14 0.89543 13.1046 0 12 0H4C2.89543 0 2 0.89543 2 2V16ZM12 12.4676L8 10.6676L4 12.4676V2H12V12.4676Z'}/>
                    </svg>
                }
                className="flex-none"
                isLoading={isLoading}
                onClick={toggleFavorite}
            />
            <FormButton type="stroke" size="small" onClick={handleNavigateToLocation}>
                Route
            </FormButton>
        </div>
    )
}
