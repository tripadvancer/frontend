import type { PaginatedResponse } from '@/types/common'
import type { IReview } from '@/types/review'

import { Paginator } from '@/components/paginator'
import { getScopedI18n } from '@/utils/i18n.server'

import { Review } from './review'

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
                <Review key={index} {...review} />
            ))}
            {totalPages > 1 && <Paginator pages={totalPages} currentPage={currentPage} />}
        </div>
    )
}
