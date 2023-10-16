import { ReviewSkeleton } from '@/components/ReviewsFeed/ReviewSkeleton'

export default function Loading() {
    return Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)
}
