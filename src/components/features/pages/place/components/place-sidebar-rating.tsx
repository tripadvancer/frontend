import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { Rating } from '@/components/ui/rating'

export const PlaceSidebarRating = async ({ avgRating, reviewsCount }: IPlace) => {
    const t = await getTranslations()

    return (
        <div className="flex flex-col gap-y-2.5">
            <Rating value={avgRating ?? 0} size={32} />
            <p className="text-small text-black-40">
                {reviewsCount
                    ? t.rich('page.place.rating.average', {
                          reviewsLink: reviewsLink => <Link href={'#reviews'}>{reviewsLink}</Link>,
                          reviewsCount: reviewsCount,
                          avgRating: avgRating?.toFixed(2),
                      })
                    : t('page.place.rating.empty')}
            </p>
        </div>
    )
}
