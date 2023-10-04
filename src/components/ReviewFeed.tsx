import { Review } from '@/components/Review'
import { IReview, PaginatedResponse } from '@/utils/interfaces'

export const ReviewFeed = ({ reviews }: { reviews: PaginatedResponse<IReview> }) => {
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
