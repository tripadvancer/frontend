'use client'

import { useTranslations } from 'next-intl'

import type { IPlace } from '@/utils/types/place'

import { BookmarkFillIcon24, BookmarkIcon24 } from '@/components/ui/icons'
import { placesAPI } from '@/redux/services/places-api'
import { useSavePlace } from '@/utils/hooks/use-save-place'

export const PlaceSidebarActionsSave = ({ place, isAuth }: { place: IPlace; isAuth: boolean }) => {
    const t = useTranslations()

    const { data: meta } = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !isAuth })
    const { toggle } = useSavePlace(place.id)

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={toggle}>
            {!!meta?.isSaved ? <BookmarkFillIcon24 /> : <BookmarkIcon24 />}
            {t('common.action.place.save')}
        </div>
    )
}
