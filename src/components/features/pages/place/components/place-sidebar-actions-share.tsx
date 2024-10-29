'use client'

import { useTranslations } from 'next-intl'

import { ShareIcon24 } from '@/components/ui/icons'
import { useSharePlace } from '@/utils/hooks/use-share-place'
import { IPlace, IPlacePreview } from '@/utils/types/place'

export const PlaceSidebarActionsShare = ({ place }: { place: IPlace }) => {
    const t = useTranslations()
    const { sharePlace } = useSharePlace(place)

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={sharePlace}>
            <ShareIcon24 />
            {t('common.action.place.share')}
        </div>
    )
}
