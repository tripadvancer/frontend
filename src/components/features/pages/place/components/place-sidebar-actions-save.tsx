'use client'

import { useTranslations } from 'next-intl'

import { BookmarkFillIcon24, BookmarkIcon24 } from '@/components/ui/icons'
import { placesAPI } from '@/redux/services/places.api'
import { useSavePlace } from '@/utils/hooks/use-save-place'

type PlaceSidebarActionsSaveProps = {
    id: number
    isAuth: boolean
}

export const PlaceSidebarActionsSave = ({ id, isAuth }: PlaceSidebarActionsSaveProps) => {
    const t = useTranslations()

    const { data: meta } = placesAPI.useGetPlaceMetaByIdQuery(id, { skip: !isAuth })
    const { savePlace } = useSavePlace(id)

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={savePlace}>
            {!!meta?.isSaved ? <BookmarkFillIcon24 /> : <BookmarkIcon24 />}
            {!!meta?.isSaved ? t('common.action.place.saved') : t('common.action.place.save')}
        </div>
    )
}
