'use client'

import { BookmarkIcon, BookmarkPlusIcon } from 'lucide-react'

import { useSavePlace } from '@/utils/hooks/use-save-place'
import { placesAPI } from '@/utils/redux/services/places/places.api'

type PlaceSidebarActionsSaveProps = {
    id: number
    isAuth: boolean
}

export const PlaceSidebarActionsSave = ({ id, isAuth }: PlaceSidebarActionsSaveProps) => {
    const { data: meta } = placesAPI.useGetPlaceMetaByIdQuery(id, { skip: !isAuth })
    const { savePlace } = useSavePlace(id)

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={savePlace}>
            {!!meta?.isSaved ? <BookmarkIcon fill="currentColor" /> : <BookmarkPlusIcon />}
            {!!meta?.isSaved ? 'Saved' : 'Save place'}
        </div>
    )
}
