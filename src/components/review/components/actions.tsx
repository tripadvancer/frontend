'use client'

import Session from 'supertokens-web-js/recipe/session'

import { IReview } from '@/utils/types/review'

import { ActionsPrivate } from './actions-private'
import { ActionsPublic } from './actions-public'

type ActionsProps = {
    review: IReview
    reviewsCount: number
}

export const Actions = async ({ review, reviewsCount }: ActionsProps) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const userInfo = accessTokenPayload.userInfo

        if (review.user.id === userInfo.id) {
            return <ActionsPrivate review={review} reviewsCount={reviewsCount} />
        }
    }

    return <ActionsPublic reviewId={review.id} />
}
