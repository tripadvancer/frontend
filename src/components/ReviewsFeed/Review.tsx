import Link from 'next/link'

import type { IReview } from '@/types/review'

import { PhotoFeed } from '@/components/PhotoFeed'
import { Rating } from '@/components/Rating'
import { FormattedDate } from '@/utils/helpers'
import { getCurrentLocale } from '@/utils/i18n.server'

import { ReviewAction } from './ReviewAction'

type ReviewProps = IReview

export const Review = ({ id, text, user, rating, photos, place, createdAt }: ReviewProps) => {
    const locale = getCurrentLocale()
    const formattedDate = FormattedDate(createdAt, locale)

    return (
        <div className="border-b border-custom-black-15 py-8 first:border-t last:border-none last:pb-0">
            <div className="sm:items-center mb-5 flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <Rating rating={rating} />
                    <div className="sm:flex-row sm:gap-x-2 flex flex-col gap-y-1 text-xs">
                        <Link href={`/places/${place.id}`} className="font-medium text-custom-black-70">
                            {place.title}
                        </Link>
                        <div className="text-custom-black-40">{formattedDate}</div>
                    </div>
                </div>
                <ReviewAction reviewId={id} userId={user.id} />
            </div>

            <div className="text-sm">{text}</div>

            {photos.length > 0 && (
                <div className="sm:grid-cols-9 mt-5 grid grid-cols-3 gap-2">
                    <PhotoFeed photos={photos} title={place.title} size={64} />
                </div>
            )}
        </div>
    )
}
