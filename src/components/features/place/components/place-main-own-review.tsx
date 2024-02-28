'use client'

import Link from 'next/link'

import { ReviewActionsPrivate } from '@/components/features/review/components/review-actions-private'
import { ReviewPhotosList } from '@/components/features/review/components/review-photos-list'
import { ReviewSkeleton } from '@/components/features/review/review-skeleton'
import { Avatar } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'
import { placesAPI } from '@/redux/services/places-api'
import { formattedDate } from '@/utils/helpers'
import { useCurrentLocale } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { PlaceMainAddReviewButton } from './place-main-add-review-button'

export const PlaceMainOwnReview = ({ placeId }: { placeId: number }) => {
    const locale = useCurrentLocale()
    const supertokens = useSupertokens()
    const response = placesAPI.useGetPlaceMetaByIdQuery(placeId, { skip: !supertokens.isAuth })

    if (response.isLoading) {
        return <ReviewSkeleton />
    }

    if (response.isSuccess) {
        if (response.data.ownReview) {
            const { rating, createdAt, text, photos, place, user } = response.data.ownReview

            return (
                <div className="flex flex-col gap-y-5 rounded-lg bg-blue-10 p-4 sm:p-8">
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
                        <ReviewActionsPrivate review={response.data.ownReview} reviewsCount={0} />
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
