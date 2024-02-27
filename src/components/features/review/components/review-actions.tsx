'use client'

import Session from 'supertokens-web-js/recipe/session'

import type { IReview } from '@/utils/types/review'

import { ReviewActionsPrivate } from './review-actions-private'
import { ReviewActionsPublic } from './review-actions-public'

type ReviewActionsProps = {
    review: IReview
    reviewsCount: number
}

export const ReviewActions = async ({ review, reviewsCount }: ReviewActionsProps) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const activeUserId = accessTokenPayload.userId

        if (activeUserId === review.user.id) {
            return <ReviewActionsPrivate review={review} reviewsCount={reviewsCount} />
        }
    }

    return <ReviewActionsPublic reviewId={review.id} />
}
