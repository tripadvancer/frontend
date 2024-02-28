import Link from 'next/link'

import type { IReview } from '@/utils/types/review'

import { Rating } from '@/components/ui/rating'
import { formattedDate } from '@/utils/helpers'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

export const ReviewRatingPlace = ({ place, rating, createdAt }: IReview) => {
    const locale = getCurrentLocale()

    return (
        <div className="flex flex-col">
            <Rating value={rating} size={16} />
            <div className="flex flex-col gap-y-1 sm:flex-row sm:gap-x-2">
                <Link href={`/places/${place.id}`} className="text-small-bold text-black-70">
                    {place.title}
                </Link>
                <div className="text-small text-black-40">{formattedDate(createdAt, locale)}</div>
            </div>
        </div>
    )
}
