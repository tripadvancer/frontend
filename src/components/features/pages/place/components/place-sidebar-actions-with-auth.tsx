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
}

export const PlaceSidebarActionsWithAuth = async (props: PlaceSidebarActionsWithAuthProps) => {
    return withAuth({
        render: ({ auth }) => <PlaceSidebarActions {...props} activeUserId={auth.activeUserId} isAuth={auth.isAuth} />,
    })
}
