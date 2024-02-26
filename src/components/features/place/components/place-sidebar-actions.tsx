'use client'

import { FormButton } from '@/components/ui/form-button'
import { GlobalLoading } from '@/components/ui/global-loading'
import { BookmarkFillIcon24, BookmarkIcon24, PinIcon24, RouteIcon24 } from '@/components/ui/icons'
import { placesAPI } from '@/redux/services/places-api'
import { navigateToLocation } from '@/utils/helpers'
import { useToggleFavorite } from '@/utils/hooks/use-toggle-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActions = ({ placeId }: { placeId: string }) => {
    const t = useI18n()
    const place = placesAPI.useGetPlaceByIdQuery(parseInt(placeId))

    const { isLoading, toggleFavorite } = useToggleFavorite(parseInt(placeId), place.data?.isFavorite)

    if (place.isSuccess) {
        const { location, isFavorite } = place.data

        return (
            <div className="flex gap-x-2">
                <FormButton
                    icon={<RouteIcon24 />}
                    className="flex-auto"
                    onClick={() => navigateToLocation(location.coordinates[1], location.coordinates[0])}
                >
                    {t('place.navigation')}
                </FormButton>
                <FormButton type="stroke" icon={<PinIcon24 />} className="flex-none" onClick={() => {}} />
                <FormButton
                    type="stroke"
                    icon={isFavorite ? <BookmarkFillIcon24 /> : <BookmarkIcon24 />}
                    className="flex-none"
                    isLoading={isLoading}
                    onClick={toggleFavorite}
                />
            </div>
        )
    }
    return <GlobalLoading />
}
