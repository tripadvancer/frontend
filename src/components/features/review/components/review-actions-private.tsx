'use client'

import type { IReview } from '@/utils/types/review'

import { ReviewEdit } from '@/components/features/review-form/review-edit'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { DeleteIcon16, EditIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ReviewActionsPrivate = (review: IReview) => {
    const t = useI18n()
    const dialog = useDialog()

    const [deleteReview] = reviewsAPI.useDeleteReviewMutation()

    const items: DropdownItemProps[] = [
        {
            caption: t('review.user_actions.edit'),
            value: 'edit',
            icon: <EditIcon16 />,
            onClick: () => dialog.open(<ReviewEdit {...review} />),
        },
        {
            caption: t('review.user_actions.delete'),
            value: 'delete',
            icon: <DeleteIcon16 />,
            isRed: true,
            requiredConfirmation: true,
            onClick: () => {
                deleteReview({ reviewId: review.id, placeId: review.place.id, userId: review.user.id })
            },
        },
    ]

    return <Dropdown items={items} />
}
