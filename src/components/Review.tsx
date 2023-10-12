import Link from 'next/link'

import type { IReview } from '@/types/review'

import { PhotoFeed } from '@/components/PhotoFeed'
import { Rating } from '@/components/Rating'
import { UserPreview } from '@/components/UserPreview'
import { FormattedDate } from '@/utils/helpers'
import { getCurrentLocale } from '@/utils/i18n.server'

type ReviewProps = IReview

export const Review = ({ text, user, rating, photos, place, createdAt }: ReviewProps) => {
    const locale = getCurrentLocale()
    const formattedDate = FormattedDate(createdAt, locale)

    return (
        <div className="border-b border-custom-black-15 py-8 first:border-t last:border-none last:pb-0">
            <div className="mb-5 flex flex-col gap-1">
                <Rating rating={rating} />
                <div className="flex flex-row gap-x-2 text-xs phone:flex-col phone:gap-y-1">
                    <Link href={`/places/${place.id}`} className="font-medium text-custom-black-70">
                        {place.title}
                    </Link>
                    <div className="text-custom-black-40">{formattedDate}</div>
                </div>
            </div>

            <div className="text-sm">{text}</div>

            {photos.length > 0 && (
                <div className="mt-5 grid grid-cols-9 gap-2 phone:grid-cols-3">
                    <PhotoFeed photos={photos} title={place.title} size={64} />
                </div>
            )}
        </div>
    )
}
