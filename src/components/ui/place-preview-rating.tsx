'use client'

import type { IPlacePreview } from '@/utils/types/place'

import { Rating } from '@/components/ui/rating'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlacePreviewRating = (place: IPlacePreview) => {
    const t = useI18n()

    return (
        <div>
            <Rating value={place.avgRating ?? 0} size={16} />
            <div className="text-small text-black-40">
                {t('place.reviews', {
                    count: place.reviewsCount ?? 0,
                })}
            </div>
        </div>
    )
}
