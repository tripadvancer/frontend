import { IReview } from '@/utils/types/review'

import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { ActionControlSkeleton } from '../action-control/action-control-skeleton'
import { PrivateReviewActions } from './private-review-actions'
import { PublicReviewActions } from './public-review-actions'

type ReviewActionsProps = {
    review: IReview
    reviewsCount: number
}

export const ReviewActions = async ({ review, reviewsCount }: ReviewActionsProps) => {
    const { session, hasToken, hasInvalidClaims } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            return <PublicReviewActions reviewId={review.id} />
        }

        /**
         * `hasInvalidClaims` indicates that session claims did not pass validation. For example if email
         * verification is required but the user's email has not been verified.
         */
        if (hasInvalidClaims) {
            /**
             * This means that one of the session claims is invalid. You should redirect the user to
             * the appropriate page depending on which claim is invalid.
             */
            return <PublicReviewActions reviewId={review.id} />
        } else {
            /**
             * This means that the session does not exist but we have session tokens for the user. In this case
             * the `TryRefreshComponent` will try to refresh the session.
             */
            return <TryRefreshComponent fallback={<ActionControlSkeleton />} />
        }
    }

    const user = await getUserInfo(session.getAccessToken())

    if (review.user.id !== user.id) {
        return <PublicReviewActions reviewId={review.id} />
    }

    return <PrivateReviewActions review={review} reviewsCount={reviewsCount} />
}
