import type { PaginatedResponse } from '@/utils/types/common'
import type { IReview } from '@/utils/types/review'

import { Paginator } from '@/components/paginator'
import { Review } from '@/components/review/review'
import { getScopedI18n } from '@/utils/i18n/i18n.server'

type ReviewFeedProps = {
    reviews: PaginatedResponse<IReview>
    currentPage: number
    variant: 'place-page' | 'user-page'
}

export const ReviewFeed = async ({ reviews, currentPage, variant }: ReviewFeedProps) => {
    const t = await getScopedI18n('common.empty_message')
    const totalPages = reviews.totalPages

    if (reviews.items.length === 0) {
        return <div className="text-center text-black-40">{t('reviews')}</div>
    }

    return (
        <div>
            {reviews.items.map((review, index) => (
                <Review key={index} review={review} reviewsCount={reviews.items.length} variant={variant} />
            ))}
            {totalPages > 1 && <Paginator pages={totalPages} currentPage={currentPage} />}
        </div>
    )
}
