import type { PaginatedResponse } from '@/types/common'
import type { IReview } from '@/types/review'

import { Review } from '@/components/Review'

type ReviewFeedProps = {
    reviews: PaginatedResponse<IReview>
}

export const ReviewFeed = ({ reviews }: ReviewFeedProps) => {
    if (reviews.items.length === 0) {
        return (
            <div className="text-center text-sm text-custom-black-40">
                There are no reviews yet. Be the first to leave a review.
            </div>
        )
    }

    return (
        <>
            {reviews.items.map((review, index) => (
                <Review key={index} {...review} />
            ))}
        </>
    )
}
