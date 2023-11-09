import type { PaginatedResponse } from '@/utils/types/common'
import type { IReview } from '@/utils/types/review'

import { Paginator } from '@/components/paginator'
import { Review } from '@/components/review/review'
import { getScopedI18n } from '@/utils/i18n/i18n.server'

type ReviewFeedProps = {
    reviews: PaginatedResponse<IReview>
    currentPage: number
}

export const ReviewFeed = async ({ reviews, currentPage }: ReviewFeedProps) => {
    const t = await getScopedI18n('common.reviews')
    const totalPages = reviews.totalPages

    if (reviews.items.length === 0) {
        return <div className="text-center text-black-40">{t('empty')}</div>
    }

    return (
        <div>
            {reviews.items.map((review, index) => (
                <Review key={index} {...review} reviewsCount={reviews.items.length} />
            ))}
            {totalPages > 1 && <Paginator pages={totalPages} currentPage={currentPage} />}
        </div>
    )
}
