import type { PaginatedResponse } from '@/types/common'
import type { IReview } from '@/types/review'

import { Paginator } from '@/components/Paginator'
import { Review } from '@/components/Review'
import { getScopedI18n } from '@/utils/i18n.server'

type ReviewFeedProps = {
    reviews: PaginatedResponse<IReview>
    currentPage: number
}

export const ReviewFeed = async ({ reviews, currentPage }: ReviewFeedProps) => {
    const t = await getScopedI18n('common.reviews')

    if (reviews.items.length === 0) {
        return <div className="text-center text-sm text-custom-black-40">{t('empty')}</div>
    }

    return (
        <>
            <div className="mb-8 last:mb-0">
                {reviews.items.map((review, index) => (
                    <Review key={index} {...review} />
                ))}
            </div>
            <Paginator pages={reviews.totalPages} currentPage={currentPage} />
        </>
    )
}
