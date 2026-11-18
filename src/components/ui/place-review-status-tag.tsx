import classNames from 'classnames'

import { PlaceReviewStatus } from '@/utils/enums'

const placeReviewStatusLabels: Record<PlaceReviewStatus, string> = {
    [PlaceReviewStatus.NEEDS_REVIEW]: 'Needs review',
    [PlaceReviewStatus.NEEDS_IMPROVEMENT]: 'Needs improvement',
    [PlaceReviewStatus.APPROVED]: 'Approved',
    [PlaceReviewStatus.REJECTED]: 'Rejected',
}

const COLORS: Record<PlaceReviewStatus, string> = {
    [PlaceReviewStatus.NEEDS_REVIEW]: 'bg-blue-100 text-white',
    [PlaceReviewStatus.NEEDS_IMPROVEMENT]: 'bg-orange-100 text-white',
    [PlaceReviewStatus.APPROVED]: 'bg-green-100 text-white',
    [PlaceReviewStatus.REJECTED]: 'bg-red-100 text-white',
}

type PlaceReviewStatusTagProps = {
    status: PlaceReviewStatus
    className?: string
    onClick?: () => void
}

export const PlaceReviewStatusTag = ({ status, className, onClick }: PlaceReviewStatusTagProps) => {
    const classes = classNames(
        COLORS[status],
        'text-small-bold text-black-100 inline-flex h-6 items-center rounded-full px-2 whitespace-nowrap',
        className,
    )

    if (onClick) {
        return (
            <button
                type="button"
                title="Change review status"
                className={classNames(classes, 'hover-animated cursor-pointer hover:opacity-80')}
                onClick={onClick}
            >
                {placeReviewStatusLabels[status]}
            </button>
        )
    }

    return <span className={classes}>{placeReviewStatusLabels[status]}</span>
}
