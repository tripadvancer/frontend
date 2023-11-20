import Link from 'next/link'

import { IReview } from '@/utils/types/review'

import { Rating } from '@/components/rating'
import { FormattedDate } from '@/utils/helpers'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

type RatingPlaceProps = IReview

export const RatingPlace = ({ place, rating, createdAt }: RatingPlaceProps) => {
    const locale = getCurrentLocale()
    const formattedDate = FormattedDate(createdAt, locale)

    return (
        <div className="flex flex-col">
            <Rating value={rating} size={16} />
            <div className="flex flex-col gap-y-1 sm:flex-row sm:gap-x-2">
                <Link href={`/places/${place.id}`} className="text-small-bold text-black-70">
                    {place.title}
                </Link>
                <div className="text-small text-black-40">{formattedDate}</div>
            </div>
        </div>
    )
}
