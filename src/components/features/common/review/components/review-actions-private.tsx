'use client'

import { PencilIcon, TrashIcon } from 'lucide-react'

import { ReviewEdit } from '@/components/features/dialogs/review-form/review-edit'
import { useDialog } from '@/components/providers/dialog-provider'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { reviewsAPI } from '@/utils/redux/services/reviews/reviews.api'
import { IReview } from '@/utils/types/common'

export const ReviewActionsPrivate = (review: IReview) => {
    const dialog = useDialog()

    const [deleteReview] = reviewsAPI.useDeleteReviewMutation()

    const items: DropdownItemProps[] = [
        {
            caption: 'Edit',
            value: 'edit',
            icon: <PencilIcon size={16} />,
            onClick: () => dialog.open(<ReviewEdit {...review} />),
        },
        {
            caption: 'Delete',
            value: 'delete',
            icon: <TrashIcon size={16} />,
            isRed: true,
            requiredConfirmation: true,
            onClick: () => {
                deleteReview({ reviewId: review.id, placeId: review.place.id, userId: review.user.id })
            },
        },
    ]

    return <Dropdown items={items} />
}
