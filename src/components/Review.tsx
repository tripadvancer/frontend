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
        <div className="border-t border-custom-blue-20 py-8 last:pb-0">
            <div className="mb-5 flex items-center justify-between">
                <Rating rating={rating} />
                <div className="text-xs text-custom-black-40">{formattedDate}</div>
            </div>

            <div className="mb-5 text-sm">{text}</div>

            {photos.length > 0 && (
                <div className="mb-5 grid grid-cols-9 gap-2 phone:grid-cols-3">
                    <PhotoFeed photos={photos} title={place.title} size={80} />
                </div>
            )}

            <div className="flex items-center gap-2">
                <UserPreview {...user} />
                <div className="cursor-pointer text-xs text-custom-red-100 transition-colors duration-300 hover:text-custom-blue-active">
                    Complain
                </div>
            </div>
        </div>
    )
}
