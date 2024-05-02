'use client'

import type { IPlace } from '@/utils/types/place'

import { BookmarkFillIcon24, BookmarkIcon24 } from '@/components/ui/icons'
import { placesAPI } from '@/redux/services/places-api'
import { useFavorite } from '@/utils/hooks/use-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsSave = ({ place, isAuth }: { place: IPlace; isAuth: boolean }) => {
    const t = useI18n()

    const { data: meta } = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !isAuth })
    const { toggle } = useFavorite(place.id, meta?.isFavorite)

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={toggle}>
            {!!meta?.isFavorite ? <BookmarkFillIcon24 /> : <BookmarkIcon24 />}
            {t('place.actions.save')}
        </div>
    )
}
