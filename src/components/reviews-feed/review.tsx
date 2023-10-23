import Link from 'next/link'

import type { IReview } from '@/types/review'

import { PhotoFeed } from '@/components/photo-feed'
import { Rating } from '@/components/rating'
import { FormattedDate } from '@/utils/helpers'
import { getCurrentLocale } from '@/utils/i18n.server'

import { ReviewAction } from './review-action'

type ReviewProps = IReview

export const Review = ({ id, text, user, rating, photos, place, createdAt }: ReviewProps) => {
    const locale = getCurrentLocale()
    const formattedDate = FormattedDate(createdAt, locale)

    return (
        <div className="border-b border-black-15 py-8 first:border-t last:border-none last:pb-0">
            <div className="mb-5 flex items-start justify-between sm:items-center">
                <div className="flex flex-col gap-1">
                    <Rating rating={rating} />
                    <div className="flex flex-col gap-y-1 sm:flex-row sm:gap-x-2 ">
                        <Link href={`/places/${place.id}`} className="text-small-bold text-black-70">
                            {place.title}
                        </Link>
                        <div className="text-small text-black-40">{formattedDate}</div>
                    </div>
                </div>
                <ReviewAction reviewId={id} userId={user.id} />
            </div>

            <div>{text}</div>

            {photos.length > 0 && (
                <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-9">
                    <PhotoFeed photos={photos} title={place.title} description={user.name} size={64} />
                </div>
            )}
        </div>
    )
}
