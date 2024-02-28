'use client'

import type { IReview } from '@/utils/types/review'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { ReviewActionsPrivate } from './review-actions-private'
import { ReviewActionsPublic } from './review-actions-public'

type ReviewActionsProps = {
    review: IReview
    reviewsCount: number
}

export const ReviewActions = ({ review, reviewsCount }: ReviewActionsProps) => {
    const supertokens = useSupertokens()

    if (supertokens.isAuth && supertokens.activeUserId === review.user.id) {
        return <ReviewActionsPrivate review={review} reviewsCount={reviewsCount} />
    }

    return <ReviewActionsPublic reviewId={review.id} />
}
