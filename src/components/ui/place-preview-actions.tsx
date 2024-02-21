import type { IPlacePreview } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16 } from '@/components/ui/icons'
import { closePopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { navigateToLocation } from '@/utils/helpers'
import { useToggleFavorite } from '@/utils/hooks/use-toggle-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlacePreviewActions = (place: IPlacePreview) => {
    const t = useI18n()
    const dispatch = useAppDispatch()

    const { isLoading, toggleFavorite } = useToggleFavorite(place.id, place.isFavorite, () => dispatch(closePopups()))

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={place.isFavorite ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />}
                className="flex-none"
                isLoading={isLoading}
                onClick={toggleFavorite}
            />
            <FormButton
                type="stroke"
                size="small"
                onClick={() => {
                    navigateToLocation(place.coordinates[1], place.coordinates[0])
                }}
            >
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
