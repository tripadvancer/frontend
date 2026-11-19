'use client'

import classNames from 'classnames'
import { ClipboardCheckIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { ReviewStatusForm } from '@/components/features/dialogs/review-status-form/review-status-form'
import { useDialog } from '@/components/providers/dialog-provider'
import { PlaceReviewStatus } from '@/utils/enums'

const placeReviewStatusLabels: Record<PlaceReviewStatus, string> = {
    [PlaceReviewStatus.NEEDS_REVIEW]: 'Needs review',
    [PlaceReviewStatus.NEEDS_IMPROVEMENT]: 'Needs improvement',
    [PlaceReviewStatus.APPROVED]: 'Approved',
    [PlaceReviewStatus.REJECTED]: 'Rejected',
}

const placeReviewStatusTextColors: Record<PlaceReviewStatus, string> = {
    [PlaceReviewStatus.NEEDS_REVIEW]: 'text-blue-100 hover:text-blue-active',
    [PlaceReviewStatus.NEEDS_IMPROVEMENT]: 'text-orange-100 hover:text-orange-active',
    [PlaceReviewStatus.APPROVED]: 'text-green-100',
    [PlaceReviewStatus.REJECTED]: 'text-red-100 hover:text-red-active',
}

type PlaceSidebarActionsReviewStatusProps = {
    id: number
    reviewStatus: PlaceReviewStatus
    reviewMessage: string | null
}

export const PlaceSidebarActionsReviewStatus = ({
    id,
    reviewStatus,
    reviewMessage,
}: PlaceSidebarActionsReviewStatusProps) => {
    const dialog = useDialog()
    const router = useRouter()

    const handleClick = () => {
        dialog.open(
            <ReviewStatusForm
                placeId={id}
                reviewStatus={reviewStatus}
                reviewMessage={reviewMessage}
                onSuccess={() => router.refresh()}
            />,
        )
    }

    return (
        <div
            className={classNames(
                'hover-animated flex cursor-pointer items-center gap-x-2 align-top',
                placeReviewStatusTextColors[reviewStatus],
            )}
            onClick={handleClick}
        >
            <ClipboardCheckIcon />
            {placeReviewStatusLabels[reviewStatus]}
        </div>
    )
}
