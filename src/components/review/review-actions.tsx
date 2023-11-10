import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { ActionControlSkeleton } from '../action-control/action-control-skeleton'
import { PrivateReviewActions } from './private-review-actions'
import { PublicReviewActions } from './public-review-actions'

type ReviewActionsProps = {
    reviewId: number
    userId: number
    reviewsCount: number
}

export const ReviewActions = async ({ reviewId, userId, reviewsCount }: ReviewActionsProps) => {
    const { session, hasToken, hasInvalidClaims } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            return <PublicReviewActions reviewId={reviewId} />
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
            return <PublicReviewActions reviewId={reviewId} />
        } else {
            /**
             * This means that the session does not exist but we have session tokens for the user. In this case
             * the `TryRefreshComponent` will try to refresh the session.
             */
            return <TryRefreshComponent fallback={<ActionControlSkeleton />} />
        }
    }

    const user = await getUserInfo(session.getAccessToken())

    if (userId !== user.id) {
        return <PublicReviewActions reviewId={reviewId} />
    }

    return <PrivateReviewActions reviewId={reviewId} reviewsCount={reviewsCount} />
}
