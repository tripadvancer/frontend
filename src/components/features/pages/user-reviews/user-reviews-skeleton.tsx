import { ReviewSkeleton } from '@/components/features/common/review/review-skeleton'

export const UserReviewsSkeleton = () => {
    return Array.from({ length: 3 }).map((_, index) => <ReviewSkeleton key={`user-review-skeleton-${index}`} />)
}
