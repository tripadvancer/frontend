import { IReview } from '@/utils/types/common'

import { ReviewActionsPrivate } from './review-actions-private'
import { ReviewActionsPublic } from './review-actions-public'

type ReviewActionsProps = {
    review: IReview
    activeUserId?: number
    isAuth: boolean
}

export const ReviewActions = ({ review, activeUserId, isAuth }: ReviewActionsProps) => {
    if (isAuth && activeUserId === review.user.id) {
        return <ReviewActionsPrivate {...review} />
    }

    return <ReviewActionsPublic {...review} />
}
