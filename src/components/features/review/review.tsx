import type { IReview } from '@/utils/types/review'

import { ReviewActions } from './components/review-actions'
import { ReviewPhotosList } from './components/review-photos-list'
import { ReviewRatingAuthor } from './components/review-rating-author'
import { ReviewRatingPlace } from './components/review-rating-place'

type ReviewProps = {
    review: IReview
    variant: 'place-page' | 'user-page'
}

export const Review = ({ review, variant }: ReviewProps) => {
    return (
        <div className="flex flex-col gap-y-5 border-b border-black-15 py-8 first:border-t">
            <div className="flex items-start justify-between sm:items-center">
                {variant === 'place-page' && <ReviewRatingAuthor {...review} />}
                {variant === 'user-page' && <ReviewRatingPlace {...review} />}

                <ReviewActions {...review} />
            </div>

            <div className="break-words">{review.text}</div>
            <ReviewPhotosList title={review.place.title} description={review.user.name} photos={review.photos} />
        </div>
    )
}
