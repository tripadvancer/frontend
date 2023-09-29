import { IReview } from '@/utils/interfaces'

import { PhotoFeed } from '@/components/PhotoFeed'
import { Rating } from '@/components/Rating'
import { UserPreview } from '@/components/UserPreview'

type ReviewProps = IReview

export const Review = ({ text, user, rating, photos, place, createdAt }: ReviewProps) => {
    return (
        <div className="border-b border-custom-blue-20 py-8 first:border-t">
            <div className="mb-4 flex items-center justify-between">
                <Rating rating={rating} />
                <div className="text-xs text-custom-black-40">{createdAt}</div>
            </div>

            <div className="mb-4 text-sm">{text}</div>

            <div className="mb-4 grid grid-cols-9 gap-2 phone:grid-cols-3">
                <PhotoFeed photos={photos} title={place.title} size={80} />
            </div>

            <div className="flex items-center gap-2">
                <UserPreview {...user} />
                <div className="cursor-pointer text-xs text-custom-red-100 transition-colors duration-300 hover:text-custom-blue-active">
                    Complain
                </div>
            </div>
        </div>
    )
}
