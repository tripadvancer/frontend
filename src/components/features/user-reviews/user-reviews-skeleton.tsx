import { ReviewSkeleton } from '@/components/features/review/review-skeleton'

export const UserReviewsSkeleton = () => {
    return (
        <div>
            {Array.from({ length: 3 }).map((_, index) => (
                <ReviewSkeleton key={index} />
            ))}
        </div>
    )
}
