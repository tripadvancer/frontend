import type { IReview } from '@/utils/types/review'

import { Actions } from './components/actions'
import { Photos } from './components/photos'
import { RatingAuthor } from './components/rating-author'
import { RatingPlace } from './components/rating-place'

type ReviewProps = {
    review: IReview
    reviewsCount: number
    variant: 'place-page' | 'user-page'
}

export const Review = ({ review, reviewsCount, variant }: ReviewProps) => {
    return (
        <div className="flex flex-col gap-y-5 border-b border-black-15 py-8 first:border-t last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between sm:items-center">
                {variant === 'place-page' && <RatingAuthor {...review} />}
                {variant === 'user-page' && <RatingPlace {...review} />}

                <Actions review={review} reviewsCount={reviewsCount} />
            </div>

            <div>{review.text}</div>
            <Photos title={review.place.title} description={review.user.name} photos={review.photos} />
        </div>
    )
}
