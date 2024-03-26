import type { Metadata } from 'next/types'

import { UserReviews } from '@/components/features/user-reviews/user-reviews'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: 'Written Reviews',
        alternates: {
            canonical: `/users/${params.id}/reviews`,
        },
    }
}

export default function UserReviewsPage({ params }: { params: { id: string } }) {
    return <UserReviews userId={parseInt(params.id)} />
}
