'use client'

import Link from 'next/link'

import type { IReview } from '@/utils/types/review'

import { Rating } from '@/components/ui/rating'
import { formattedDate } from '@/utils/helpers/common'
import { useCurrentLocale } from '@/utils/i18n/i18n.client'

export const ReviewRatingPlace = ({ place, rating, createdAt }: IReview) => {
    const locale = useCurrentLocale()

    return (
        <div className="overflow-hidden">
            <Rating value={rating} size={16} />
            <div className="flex flex-col gap-x-2 sm:flex-row">
                <Link href={`/places/${place.id}`} className="break-words text-small-bold text-black-70">
                    {place.title}
                </Link>
                <div className="text-small text-black-40">{formattedDate(createdAt, locale)}</div>
            </div>
        </div>
    )
}
