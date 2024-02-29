import { UserReviews } from '@/components/features/user-reviews/user-reviews'

export default function UserReviewsPage({ params }: { params: { id: string } }) {
    return <UserReviews userId={parseInt(params.id)} />
}
