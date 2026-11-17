import { withAuth } from '@/utils/supertokens/with-auth'

import { PlaceMainReviews } from './place-main-reviews'

type PlaceMainReviewsWithAuthProps = {
    id: number
}

export const PlaceMainReviewsWithAuth = async ({ id }: PlaceMainReviewsWithAuthProps) => {
    return withAuth({
        render: ({ auth }) => <PlaceMainReviews placeId={id} {...auth} />,
    })
}
