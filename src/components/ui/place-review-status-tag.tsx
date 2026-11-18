import classNames from 'classnames'

import { PlaceReviewStatus } from '@/utils/enums'

const LABELS: Record<PlaceReviewStatus, string> = {
    [PlaceReviewStatus.NEEDS_REVIEW]: 'Needs review',
    [PlaceReviewStatus.NEEDS_IMPROVEMENT]: 'Needs improvement',
    [PlaceReviewStatus.APPROVED]: 'Approved',
    [PlaceReviewStatus.REJECTED]: 'Rejected',
}

const COLORS: Record<PlaceReviewStatus, string> = {
    [PlaceReviewStatus.NEEDS_REVIEW]: 'bg-blue-20',
    [PlaceReviewStatus.NEEDS_IMPROVEMENT]: 'bg-orange-20',
    [PlaceReviewStatus.APPROVED]: 'bg-green-100',
    [PlaceReviewStatus.REJECTED]: 'bg-red-20',
}

type PlaceReviewStatusTagProps = {
    status: PlaceReviewStatus
    className?: string
}

export const PlaceReviewStatusTag = ({ status, className }: PlaceReviewStatusTagProps) => {
    return (
        <span
            className={classNames(
                COLORS[status],
                'text-small-bold text-black-100 inline-flex h-6 items-center rounded-full px-2 whitespace-nowrap',
                className,
            )}
        >
            {LABELS[status]}
        </span>
    )
}
