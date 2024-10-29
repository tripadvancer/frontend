import { getTranslations } from 'next-intl/server'

import { IPlace } from '@/utils/types/place'

import { PlaceMainOwnReview } from './place-main-own-review'
import { PlaceMainReviewsFeed } from './place-main-reviews-feed'

type PlaceMainReviewsProps = {
    place: IPlace
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const PlaceMainReviews = async ({ place, activeUserId, isAuth, isEmailVerified }: PlaceMainReviewsProps) => {
    const t = await getTranslations()

    return (
        <section className="flex scroll-m-24 flex-col gap-y-8 sm:scroll-m-28" id="reviews">
            <h2 className="h5">{t('page.place.reviews')}</h2>
            <div className="flex flex-col gap-y-8">
                <PlaceMainOwnReview
                    place={place}
                    activeUserId={activeUserId}
                    isAuth={isAuth}
                    isEmailVerified={isEmailVerified}
                />
                <PlaceMainReviewsFeed placeId={place.id} activeUserId={activeUserId} isAuth={isAuth} />
            </div>
        </section>
    )
}
