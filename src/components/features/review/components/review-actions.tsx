'use client'

import type { IReview } from '@/utils/types/review'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { ReviewActionsPrivate } from './review-actions-private'
import { ReviewActionsPublic } from './review-actions-public'

export const ReviewActions = (review: IReview) => {
    const supertokens = useSupertokens()

    if (supertokens.isAuth && supertokens.activeUserId === review.user.id) {
        return <ReviewActionsPrivate {...review} />
    }

    return <ReviewActionsPublic {...review} />
}
