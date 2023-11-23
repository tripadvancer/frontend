import { ButtonMinorSkeleton } from '@/components/forms/button-minor/button-minor-skeleton'
import { ReviewsFeedSkeleton } from '@/components/reviews-feed/reviews-feed-skeleton'

export const ReviewsSkeleton = () => {
    return (
        <div>
            <div role="status" className="mb-8 w-1/3 animate-pulse">
                <div className="h-8 w-full rounded-lg bg-black-5" />
            </div>
            <div className="flex flex-col gap-y-8">
                <ButtonMinorSkeleton />
                <ReviewsFeedSkeleton />
            </div>
        </div>
    )
}
