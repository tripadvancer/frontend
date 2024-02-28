'use client'

import Session from 'supertokens-web-js/recipe/session'

import Link from 'next/link'

import { ReviewActionsPrivate } from '@/components/features/review/components/review-actions-private'
import { ReviewPhotosList } from '@/components/features/review/components/review-photos-list'
import { ReviewSkeleton } from '@/components/features/review/review-skeleton'
import { Avatar } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'
import { placesAPI } from '@/redux/services/places-api'
import { formattedDate } from '@/utils/helpers'
import { useCurrentLocale } from '@/utils/i18n/i18n.client'

import { PlaceMainAddReviewButton } from './place-main-add-review-button'

export const PlaceMainOwnRewiewWrapper = async ({ placeId }: { placeId: number }) => {
    const doesSessionExist = await Session.doesSessionExist()
    return <PlaceMainOwnReview placeId={placeId} isAuth={doesSessionExist} />
}

export const PlaceMainOwnReview = ({ placeId, isAuth }: { placeId: number; isAuth: boolean }) => {
    const locale = useCurrentLocale()
    const review = placesAPI.useGetPlaceMetaByIdQuery(placeId, { skip: !isAuth })

    if (review.isLoading) {
        return <ReviewSkeleton />
    }

    if (review.isSuccess) {
        if (review.data.ownReview) {
            const { rating, createdAt, text, photos, place, user } = review.data.ownReview

            return (
                <div className="flex flex-col gap-y-5 rounded-lg bg-blue-10 p-8">
                    <div className="flex items-start justify-between sm:items-center">
                        <Link href={`/users/${user.id}`} className="group inline-flex items-start gap-2">
                            <Avatar {...user} size={32} />
                            <div className="flex flex-col">
                                <Rating value={rating} size={16} />
                                <div className="sm:flex sm:gap-x-2">
                                    <div className="hover-animated text-small-bold text-black-70 group-hover:text-blue-active">
                                        {user.name}
                                    </div>
                                    <div className="text-small text-black-40">{formattedDate(createdAt, locale)}</div>
                                </div>
                            </div>
                        </Link>
                        <ReviewActionsPrivate review={review.data.ownReview} reviewsCount={0} />
                    </div>
                    <div>{text}</div>
                    <ReviewPhotosList title={place.title} description={user.name} photos={photos} />
                </div>
            )
        }

        return <PlaceMainAddReviewButton placeId={placeId} />
    }

    return null
}
