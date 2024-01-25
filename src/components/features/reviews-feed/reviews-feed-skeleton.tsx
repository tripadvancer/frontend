import { ReviewSkeleton } from '@/components/features/review/review-skeleton'

const REVIEWS_COUNT = 3

export const ReviewsFeedSkeleton = () => {
    return (
        <div>
            {Array.from({ length: REVIEWS_COUNT }).map((_, index) => (
                <ReviewSkeleton key={index} />
            ))}
        </div>
    )
}
