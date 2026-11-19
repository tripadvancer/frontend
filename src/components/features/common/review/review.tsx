'use client'

import classNames from 'classnames'

import { IReview } from '@/utils/types/common'

import { ReviewActions } from './components/review-actions'
import { ReviewPhotosList } from './components/review-photos-list'
import { ReviewRatingAuthor } from './components/review-rating-author'
import { ReviewRatingPlace } from './components/review-rating-place'

type ReviewProps = {
    review: IReview
    variant: 'place-page' | 'user-page'
    className?: string
    activeUserId?: number
    isAuth: boolean
}

export const Review = ({ review, variant, className, activeUserId, isAuth }: ReviewProps) => {
    return (
        <div
            className={classNames(
                'border-black-15 flex flex-col gap-y-5 border-b py-8 first:border-t last:border-b-0 last:pb-0',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-x-8">
                {variant === 'place-page' && <ReviewRatingAuthor {...review} />}
                {variant === 'user-page' && <ReviewRatingPlace {...review} />}

                <ReviewActions review={review} activeUserId={activeUserId} isAuth={isAuth} />
            </div>

            <div className="flex flex-col gap-y-2.5">
                <div className="wrap-break-word">{review.text}</div>
            </div>

            <ReviewPhotosList title={review.place.title} description={review.user.name} photos={review.photos} />
        </div>
    )
}
