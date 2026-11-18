import { ClipboardCheckIcon } from 'lucide-react'

import { Notice } from '@/components/ui/notice'
import { PlaceReviewStatusTag } from '@/components/ui/place-review-status-tag'
import { getUserInfo } from '@/services/user'
import { PlaceReviewStatus, UserRole } from '@/utils/enums'
import { withAuth } from '@/utils/supertokens/with-auth'

type PlaceReviewStatusWithAuthProps = {
    author: {
        id: number
    }
    reviewStatus: PlaceReviewStatus | null
}

// The review status is shown only to the author with the BOT role
export const PlaceReviewStatusWithAuth = async ({ author, reviewStatus }: PlaceReviewStatusWithAuthProps) => {
    return withAuth({
        getAuthData: getUserInfo,
        render: ({ auth, data }) =>
            reviewStatus && data?.role === UserRole.BOT && auth.activeUserId === author.id ? (
                <Notice
                    message={
                        <>
                            Review status: <PlaceReviewStatusTag status={reviewStatus} className="align-middle" />
                        </>
                    }
                    icon={<ClipboardCheckIcon />}
                    variant="blue"
                />
            ) : null,
    })
}
