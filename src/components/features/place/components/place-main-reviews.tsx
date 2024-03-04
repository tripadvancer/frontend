import type { IPlace } from '@/utils/types/place'

import { getI18n } from '@/utils/i18n/i18n.server'

import { PlaceMainOwnReview } from './place-main-own-review'
import { PlaceMainReviewsList } from './place-main-reviews-list'

export const PlaceMainReviews = async ({ id }: IPlace) => {
    const t = await getI18n()

    return (
        <section className="flex scroll-m-24 flex-col gap-y-8 sm:scroll-m-28" id="reviews">
            <h2 className="text-h5-m sm:text-h5">{t('pages.place.reviews.title')}</h2>
            <div className="flex flex-col gap-y-8">
                <PlaceMainOwnReview placeId={id} />
                <PlaceMainReviewsList placeId={id} />
            </div>
        </section>
    )
}
