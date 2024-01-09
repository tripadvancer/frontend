import type { PaginatedResponse } from '@/utils/types/common'
import type { IReview } from '@/utils/types/review'

import { Review } from '@/components/features/review/review'
import { Paginator } from '@/components/ui/paginator'
import { getI18n } from '@/utils/i18n/i18n.server'

type ReviewsFeedProps = {
    reviews: PaginatedResponse<IReview>
    currentPage: number
    variant: 'place-page' | 'user-page'
}

export const ReviewsFeed = async ({ reviews, currentPage, variant }: ReviewsFeedProps) => {
    const t = await getI18n()
    const totalPages = reviews.totalPages

    if (reviews.items.length === 0) {
        return <div className="text-center text-black-40">{t('common.empty_message.reviews')}</div>
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
