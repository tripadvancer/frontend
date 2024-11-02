'use client'

import { useTranslations } from 'next-intl'

import { ReviewEdit } from '@/components/features/dialogs/review-form/review-edit'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { DeleteIcon16, EditIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { reviewsAPI } from '@/redux/services/reviews.api'
import { IReview } from '@/utils/types/common'

export const ReviewActionsPrivate = (review: IReview) => {
    const t = useTranslations()
    const dialog = useDialog()

    const [deleteReview] = reviewsAPI.useDeleteReviewMutation()

    const items: DropdownItemProps[] = [
        {
            caption: t('common.action.review.edit'),
            value: 'edit',
            icon: <EditIcon16 />,
            onClick: () => dialog.open(<ReviewEdit {...review} />),
        },
        {
            caption: t('common.action.review.delete'),
            value: 'delete',
            icon: <DeleteIcon16 />,
            isRed: true,
            requiredConfirmation: true,
            onClick: () => {
                deleteReview({ reviewId: review.id, placeId: review.place.id, userId: review.user.id })
            },
        },
    ]

    return (
        <div>
            <Dropdown items={items} />
        </div>
    )
}
