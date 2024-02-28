'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { IReview } from '@/utils/types/review'

import { ReviewEdit } from '@/components/features/review-form/review-edit'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { DeleteIcon16, EditIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

type ReviewActionsPrivateProps = {
    review: IReview
    reviewsCount: number
}

export const ReviewActionsPrivate = ({ review, reviewsCount }: ReviewActionsPrivateProps) => {
    const t = useI18n()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const dialog = useDialog()
    const toast = useToast()
    const page = searchParams.get('page')

    const [deleteReview] = reviewsAPI.useDeleteReviewMutation()

    const handleDeleteReview = () => {
        const inputs = { reviewId: review.id, placeId: review.place.id }

        deleteReview(inputs)
            .unwrap()
            .then(() => {
                dialog.close()
                toast.success(t('success.delete_review'))
                reviewsCount === 1 && page && page !== '1'
                    ? router.push(`${pathname}?page=${parseInt(page) - 1}`)
                    : router.refresh()
            })
            .catch(() => {
                toast.error(t('common.error'))
            })
    }

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
            onClick: handleDeleteReview,
        },
    ]

    return <Dropdown items={items} />
}
