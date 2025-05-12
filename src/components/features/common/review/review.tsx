'use client'

import { useEffect, useState } from 'react'

import classNames from 'classnames'

// import { Translate } from '@/components/ui/translate'
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
    const [displayText, setDisplayText] = useState<string>()

    useEffect(() => {
        setDisplayText(review.text)
    }, [review.text])

    return (
        <div className={classNames('flex flex-col gap-y-5 border-b border-black-15 py-8 first:border-t', className)}>
            <div className="flex items-start justify-between gap-x-8">
                {variant === 'place-page' && <ReviewRatingAuthor {...review} />}
                {variant === 'user-page' && <ReviewRatingPlace {...review} />}

                <ReviewActions review={review} activeUserId={activeUserId} isAuth={isAuth} />
            </div>

            <div className="flex flex-col gap-y-2.5">
                {/* <div className="text-small">
                    <Translate
                        originalText={review.text}
                        availableTargets={[
                            { label: 'Русский', code: 'ru' },
                            { label: 'English', code: 'en' },
                        ]}
                        onTranslate={setDisplayText}
                    />
                </div> */}
                <div className="break-words">{displayText}</div>
            </div>

            <ReviewPhotosList title={review.place.title} description={review.user.name} photos={review.photos} />
        </div>
    )
}
