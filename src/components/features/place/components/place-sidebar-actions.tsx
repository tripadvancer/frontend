'use client'

import type { IPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon24, BookmarkIcon24, PinIcon24, RouteIcon24 } from '@/components/ui/icons'
import { navigateToLocation } from '@/utils/helpers'
import { useToggleFavorite } from '@/utils/hooks/use-toggle-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActions = ({ id, location, isFavorite }: IPlace) => {
    const t = useI18n()

    const { isLoading, toggleFavorite } = useToggleFavorite(id, isFavorite)

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
