import { ReviewFeed } from '@/components/reviews-feed/reviews-feed'
import { getReviewsByUserId } from '@/services/reviews'

export default async function UserReviews({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { page: string }
}) {
    const userId = params.id
    const currentPage = searchParams.page ?? '1'
    const reviews = await getReviewsByUserId(userId, currentPage)

    return <ReviewFeed reviews={reviews} currentPage={parseInt(currentPage)} />
}
