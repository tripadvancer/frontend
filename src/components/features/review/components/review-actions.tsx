'use client'

import Session from 'supertokens-web-js/recipe/session'

import type { IReview } from '@/utils/types/review'

import { ReviewActionsPrivate } from './review-actions-private'
import { ReviewActionsPublic } from './review-actions-public'

export const ReviewActions = (review: IReview) => {
    // const doesSessionExist = await Session.doesSessionExist()
    // const userId = await Session.getAccessTokenPayloadSecurely().then(payload => payload.userId)

    // if (doesSessionExist && userId === review.user.id) {
    //     return <ReviewActionsPrivate {...review} />
    // }

    // return <ReviewActionsPublic {...review} />
    return null
}
