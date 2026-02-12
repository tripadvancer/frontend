'use client'

import { BookmarkIcon, BookmarkPlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useSavePlace } from '@/utils/hooks/use-save-place'
import { placesAPI } from '@/utils/redux/services/places/places.api'

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
            {!!meta?.isSaved ? <BookmarkIcon fill="currentColor" /> : <BookmarkPlusIcon />}
            {!!meta?.isSaved ? t('common.action.place.saved') : t('common.action.place.save')}
        </div>
    )
}
