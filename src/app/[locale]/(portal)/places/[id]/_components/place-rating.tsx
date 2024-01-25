import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { Rating } from '@/components/ui/rating'
import { getI18n } from '@/utils/i18n/i18n.server'

export const PlaceRating = async ({ avgRating, reviewsCount }: IPlace) => {
    const t = await getI18n()

    return (
        <div className="flex flex-col items-center gap-y-2">
            <Rating value={avgRating ?? 0} size={32} />
            <p className="text-sm text-black-40">
                {reviewsCount
                    ? t('place.rating', {
                          reviews: <Link href={'#reviews'}>{t('place.reviews', { count: reviewsCount })}</Link>,
                          avg_rating: avgRating?.toFixed(2),
                      })
                    : t('place.rating.empty')}
            </p>
        </div>
    )
}
