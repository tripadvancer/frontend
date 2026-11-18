'use client'

import { ClipboardCheckIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { ReviewStatusForm } from '@/components/features/dialogs/review-status-form/review-status-form'
import { useDialog } from '@/components/providers/dialog-provider'
import { Notice } from '@/components/ui/notice'
import { PlaceReviewStatusTag } from '@/components/ui/place-review-status-tag'
import { PlaceReviewStatus } from '@/utils/enums'

type PlaceReviewStatusNoticeProps = {
    placeId: number
    reviewStatus: PlaceReviewStatus
    reviewMessage: string | null
}

export const PlaceReviewStatusNotice = ({ placeId, reviewStatus, reviewMessage }: PlaceReviewStatusNoticeProps) => {
    const dialog = useDialog()
    const router = useRouter()

    const handleClick = () => {
        dialog.open(
            <ReviewStatusForm
                placeId={placeId}
                reviewStatus={reviewStatus}
                reviewMessage={reviewMessage}
                onSuccess={() => router.refresh()}
            />,
        )
    }

    return (
        <Notice
            message={
                <>
                    Review status:{' '}
                    <PlaceReviewStatusTag status={reviewStatus} className="align-middle" onClick={handleClick} />
                    {reviewMessage && (
                        <span className="text-small text-black-70 mt-2 block whitespace-pre-line">{reviewMessage}</span>
                    )}
                </>
            }
            icon={<ClipboardCheckIcon />}
            variant="blue"
        />
    )
}
