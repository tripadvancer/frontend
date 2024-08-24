'use client'

import classNames from 'classnames'

import type { IReview } from '@/utils/types/review'

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
        <div className={classNames('flex flex-col gap-y-5 border-b border-black-15 py-8 first:border-t', className)}>
            <div className="flex justify-between gap-x-8">
                {variant === 'place-page' && <ReviewRatingAuthor {...review} />}
                {variant === 'user-page' && <ReviewRatingPlace {...review} />}

                <ReviewActions review={review} activeUserId={activeUserId} isAuth={isAuth} />
            </div>

            <div className="break-words">{review.text}</div>
            <ReviewPhotosList title={review.place.title} description={review.user.name} photos={review.photos} />
        </div>
    )
}
