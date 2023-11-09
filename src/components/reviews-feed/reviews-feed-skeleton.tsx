import { ReviewSkeleton } from '@/components/review/review-skeleton'

const REVIEWS_COUNT = 3

export const ReviewsFeedSkeleton = () => {
    return Array.from({ length: REVIEWS_COUNT }).map((_, index) => <ReviewSkeleton key={index} />)
}
