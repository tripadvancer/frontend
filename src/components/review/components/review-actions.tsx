'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Dropdown, DropdownItemProps } from '@/components/dropdown'
import { ReviewComplainForm } from '@/components/review-complain-form'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { getCurrentUser } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { removeReviewById } from '@/services/reviews'
import { useI18n } from '@/utils/i18n.client'

type ReviewActionProps = {
    reviewId: number
    userId: number
    reviewsCount: number
}

export const ReviewActions = ({ reviewId, userId, reviewsCount }: ReviewActionProps) => {
    const t = useI18n()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const user = useAppSelector(getCurrentUser)
    const dialog = useDialog()
    const toast = useToast()

    const page = searchParams.get('page')

    const handleRemove = async () => {
        try {
            await removeReviewById(reviewId.toString())
            dialog.close()
            toast.success(t('review.remove.success'))
            // Redirect to previous page if user remove last review on current page and current page is not first
            reviewsCount === 1 && page && page !== '1'
                ? router.push(`${pathname}?page=${parseInt(page) - 1}`)
                : router.refresh()
        } catch (err: any) {
            toast.error(t('common.error'))
        }
    }

    const handleComplain = () => {
        dialog.open(<ReviewComplainForm reviewId={reviewId} />)
    }

    const items: DropdownItemProps[] = []

    if (user?.id === userId) {
        items.push(
            {
                caption: t('review.menu.edit'),
                value: 'edit',
                // prettier-ignore
                icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M11 1C11.5288 1 11.9869 1.20949 12.3544 1.57991L14.4217 3.64718C14.7924 4.01786 15 4.47274 15 5C15 5.52385 14.794 6.06728 14.4217 6.43959L6.89021 13.9675C6.36661 14.5715 5.62438 14.9426 4.7564 15.0016H1V14.0016L1.00325 11.1647C1.06698 10.3758 1.43373 9.64229 1.98196 9.15991L9.56093 1.58101C9.93285 1.20718 10.4754 1 11 1ZM3.35157 10.6161C3.14601 10.7979 3.01885 11.0522 3 11.2452V13.0025L4.68578 13.004C4.95369 12.9851 5.20307 12.8604 5.42749 12.6054L9.80933 8.22354L7.77751 6.19172L3.35157 10.6161ZM9.19197 4.77776L11.2235 6.80933L12.9895 5.04339L10.9582 3.01212L9.19197 4.77776Z" />
                    </svg>
                ),
                onClick: () => alert('Do not implemented yet'),
            },
            {
                caption: t('review.menu.delete'),
                value: 'delete',
                // prettier-ignore
                icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7 0H9C10.1046 0 11 0.89543 11 2H14C15.1046 2 16 2.89543 16 4V5C16 6.10457 15.1046 7 14 7H13.9199L13 14C13 15.1046 12.1046 16 11 16H5C3.89543 16 3 15.1046 3.00345 14.083L2.07987 7H2C0.89543 7 0 6.10457 0 5V4C0 2.89543 0.89543 2 2 2H5C5 0.89543 5.89543 0 7 0ZM2 4H14V5H2V4ZM4.08649 7H11.9132L11.0035 13.917L11 14H5L4.08649 7Z" />
                    </svg>
                ),
                isRed: true,
                requiredConfirmation: true,
                onClick: handleRemove,
            },
        )
    }

    if (user?.id !== userId) {
        items.push({
            caption: t('review.menu.complain'),
            value: 'complain',
            // prettier-ignore
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM14 8C14 11.3137 11.3137 14 8 14C6.7042 14 5.50434 13.5892 4.52354 12.8908L12.8908 4.52354C13.5892 5.50434 14 6.7042 14 8ZM3.1093 11.4766L11.4766 3.1093C10.4958 2.41081 9.29586 2 8 2C4.68629 2 2 4.68629 2 8C2 9.29586 2.41081 10.4958 3.1093 11.4766Z" />
                </svg>
            ),
            isRed: true,
            onClick: handleComplain,
        })
    }

    return <Dropdown items={items} />
}
