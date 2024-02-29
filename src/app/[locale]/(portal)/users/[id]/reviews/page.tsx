import { UserReviewsList } from '@/components/features/user-reviews/user-reviews-list'

export default async function UserReviewsPage({ params }: { params: { id: string } }) {
    return <UserReviewsList userId={parseInt(params.id)} />
}
