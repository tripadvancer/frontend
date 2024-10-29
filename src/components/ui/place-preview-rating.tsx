'use client'

import { useTranslations } from 'next-intl'

import { Rating } from '@/components/ui/rating'

type PlacePreviewRatingProps = {
    avgRating: number | null
    reviewsCount: number
}

export const PlacePreviewRating = ({ avgRating, reviewsCount }: PlacePreviewRatingProps) => {
    const t = useTranslations()

    return (
        <div>
            <Rating value={avgRating ?? 0} size={16} />
            <div className="text-small text-black-40">
                {t('common.reviewsCounter', {
                    count: reviewsCount ?? 0,
                })}
            </div>
        </div>
    )
}
