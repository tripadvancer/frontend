'use client'

import type { IPlace } from '@/utils/types/place'

import { Rating } from '@/components/ui/rating'
import { useI18n } from '@/utils/i18n/i18n.client'

type PlacePreviewRatingProps = Pick<IPlace, 'avgRating' | 'reviewsCount'>

export const PlacePreviewRating = (place: PlacePreviewRatingProps) => {
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
