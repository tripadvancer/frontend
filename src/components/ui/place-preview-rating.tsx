'use client'

import { useTranslations } from 'next-intl'

import { Rating } from '@/components/ui/rating'
import { IPlace } from '@/utils/types/place'

type PlacePreviewRatingProps = {
    avgRating: IPlace['avgRating']
    reviewsCount: IPlace['reviewsCount']
}

export const PlacePreviewRating = (place: PlacePreviewRatingProps) => {
    const t = useTranslations()

    return (
        <div>
            <Rating value={place.avgRating ?? 0} size={16} />
            <div className="text-small text-black-40">
                {t('common.reviewsCounter', {
                    count: place.reviewsCount ?? 0,
                })}
            </div>
        </div>
    )
}
