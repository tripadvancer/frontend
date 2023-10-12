import type { Metadata } from 'next/types'

import { ReviewFeed } from '@/components/ReviewFeed'
import { getReviewsByUserId } from '@/services/reviews'
import { getUserById } from '@/services/user'
import { getScopedI18n } from '@/utils/i18n.server'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const t = await getScopedI18n('pages.user.reviews.meta')
    const user = await getUserById(params.id)

    return {
        title: t('title', { username: user.name }),
        description: '',
    }
}

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

    return (
        <ReviewFeed reviews={reviews} currentPage={parseInt(currentPage)} />
    )
}
