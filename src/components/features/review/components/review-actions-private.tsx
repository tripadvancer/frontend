'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { IReview } from '@/utils/types/review'

import { EditReview } from '@/components/features/review-form/edit-review'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { DeleteIcon16, EditIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { deleteReviewById } from '@/services/reviews'
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

    const handleDeleteReview = async () => {
        try {
            await deleteReviewById(review.id.toString())
            dialog.close()
            toast.success(t('success.delete_review'))
            // Redirect to previous page if user delete last review on current page and current page is not first
            reviewsCount === 1 && page && page !== '1'
                ? router.push(`${pathname}?page=${parseInt(page) - 1}`)
                : router.refresh()
        } catch (err: any) {
            toast.error(t('common.error'))
        }
    }

    const items: DropdownItemProps[] = [
        {
            caption: t('review.user_actions.edit'),
            value: 'edit',
            icon: <EditIcon16 />,
            onClick: () => dialog.open(<EditReview {...review} />),
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
