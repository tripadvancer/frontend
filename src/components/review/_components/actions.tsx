import { IReview } from '@/utils/types/review'

import { ActionControlSkeleton } from '@/components/action-control/action-control-skeleton'
import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { ActionsPrivate } from './actions-private'
import { ActionsPublic } from './actions-public'

type ActionsProps = {
    review: IReview
    reviewsCount: number
}

export const Actions = async ({ review, reviewsCount }: ActionsProps) => {
    const { session, hasToken, hasInvalidClaims } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            return <ActionsPublic reviewId={review.id} />
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
            return <ActionsPublic reviewId={review.id} />
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
        return <ActionsPublic reviewId={review.id} />
    }

    return <ActionsPrivate review={review} reviewsCount={reviewsCount} />
}
