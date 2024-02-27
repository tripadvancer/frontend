import { Reviews } from '@/components/features/reviews/reviews'
import { getReviewsByUserId } from '@/services/reviews'

export default async function UserReviewsPage({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { page: string }
}) {
    const userId = params.id
    const currentPage = searchParams.page ?? '1'
    const reviews = await getReviewsByUserId(userId, currentPage)

    return <Reviews reviews={reviews} currentPage={parseInt(currentPage)} variant="user-page" />
}
