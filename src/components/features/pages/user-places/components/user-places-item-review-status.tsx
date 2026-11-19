'use client'

import { ReviewStatusForm } from '@/components/features/dialogs/review-status-form/review-status-form'
import { useDialog } from '@/components/providers/dialog-provider'
import { PlaceReviewStatusTag } from '@/components/ui/place-review-status-tag'
import { PlaceReviewStatus } from '@/utils/enums'
import { useAppDispatch } from '@/utils/redux/hooks'
import { UpdateReviewStatusResponse } from '@/utils/redux/services/places/places.types'
import { usersAPI } from '@/utils/redux/services/users/users.api'

type UserPlacesItemReviewStatusProps = {
    id: number
    userId: number
    reviewStatus: PlaceReviewStatus
    reviewMessage: string | null
}

export const UserPlacesItemReviewStatus = ({
    id,
    userId,
    reviewStatus,
    reviewMessage,
}: UserPlacesItemReviewStatusProps) => {
    const dialog = useDialog()
    const dispatch = useAppDispatch()

    const handleSuccess = (result: UpdateReviewStatusResponse) => {
        dispatch(
            usersAPI.util.updateQueryData('getPlacesByUserId', { userId, page: 1 }, draft => {
                const place = draft.items.find(item => item.id === id)

                if (place) {
                    place.reviewStatus = result.reviewStatus
                    place.reviewMessage = result.reviewMessage
                }
            }),
        )
    }

    const handleClick = () => {
        dialog.open(
            <ReviewStatusForm
                placeId={id}
                reviewStatus={reviewStatus}
                reviewMessage={reviewMessage}
                onSuccess={handleSuccess}
            />,
        )
    }

    return <PlaceReviewStatusTag status={reviewStatus} onClick={handleClick} />
}
