import { getUserInfo } from '@/services/user'
import { PlaceReviewStatus, UserRole } from '@/utils/enums'
import { withAuth } from '@/utils/supertokens/with-auth'
import { GeoJsonPoint } from '@/utils/types/geo'

import { PlaceSidebarActions } from './place-sidebar-actions'

type PlaceSidebarActionsWithAuthProps = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    author: {
        id: number
        name: string
        avatar: string | null
    }
    location: GeoJsonPoint
    reviewStatus: PlaceReviewStatus | null
    reviewMessage: string | null
}

export const PlaceSidebarActionsWithAuth = async (props: PlaceSidebarActionsWithAuthProps) => {
    return withAuth({
        getAuthData: getUserInfo,
        render: ({ auth, data }) => (
            <PlaceSidebarActions
                {...props}
                activeUserId={auth.activeUserId}
                isAuth={auth.isAuth}
                canManageReviewStatus={
                    props.reviewStatus !== null && data?.role === UserRole.BOT && auth.activeUserId === props.author.id
                }
            />
        ),
    })
}
