import { ReviewFeed } from '@/components/ReviewsFeed/ReviewsFeed'
import { getReviewsByPlaceId } from '@/services/reviews'

export default async function PlaceReviews({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { page: string }
}) {
    const placeId = params.id
    const currentPage = searchParams.page ?? '1'
    const reviews = await getReviewsByPlaceId(placeId, currentPage)

    return <ReviewFeed reviews={reviews} currentPage={parseInt(currentPage)} />
}
