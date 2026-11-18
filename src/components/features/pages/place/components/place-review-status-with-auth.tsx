import { getUserInfo } from '@/services/user'
import { PlaceReviewStatus, UserRole } from '@/utils/enums'
import { withAuth } from '@/utils/supertokens/with-auth'

import { PlaceReviewStatusNotice } from './place-review-status-notice'

type PlaceReviewStatusWithAuthProps = {
    id: number
    author: {
        id: number
    }
    reviewStatus: PlaceReviewStatus | null
    reviewMessage: string | null
}

// The review status, its comment and the review actions are available only to the author with the BOT role
export const PlaceReviewStatusWithAuth = async ({
    id,
    author,
    reviewStatus,
    reviewMessage,
}: PlaceReviewStatusWithAuthProps) => {
    return withAuth({
        getAuthData: getUserInfo,
        render: ({ auth, data }) =>
            reviewStatus && data?.role === UserRole.BOT && auth.activeUserId === author.id ? (
                <PlaceReviewStatusNotice placeId={id} reviewStatus={reviewStatus} reviewMessage={reviewMessage} />
            ) : null,
    })
}
