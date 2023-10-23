import { ReviewSkeleton } from '@/components/reviews-feed/review-skeleton'

export default function Loading() {
    return Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)
}
