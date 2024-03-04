'use client'

import type { IPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon24, BookmarkIcon24, PinIcon24, RouteIcon24 } from '@/components/ui/icons'
import { placesAPI } from '@/redux/services/places-api'
import { navigateToLocation } from '@/utils/helpers'
import { useFavorite } from '@/utils/hooks/use-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const PlaceSidebarActions = ({ id, location }: IPlace) => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const response = placesAPI.useGetPlaceMetaByIdQuery(id, { skip: !supertokens.isAuth })
    const favorite = useFavorite(id, response.data?.isFavorite)

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
                icon={!!response.data?.isFavorite ? <BookmarkFillIcon24 /> : <BookmarkIcon24 />}
                className="flex-none"
                isLoading={favorite.isLoading}
                onClick={favorite.toggle}
            />
        </div>
    )
}
