import { ReviewsFeed } from '@/components/reviews-feed/reviews-feed'
import { getPlaceById } from '@/services/places'
import { getReviewsByPlaceId } from '@/services/reviews'
import { getI18n } from '@/utils/i18n/i18n.server'

import { AddReviewButton } from './add-review-button'

type ReviewsProps = {
    placeId: string
    page: string
}

export const Reviews = async ({ placeId, page }: ReviewsProps) => {
    const t = await getI18n()
    const currentPage = page ?? '1'

    const placeData = getPlaceById(placeId)
    const reviewsData = getReviewsByPlaceId(placeId, currentPage)

    const [place, reviews] = await Promise.all([placeData, reviewsData])

    return (
        <section>
            <h2 className="mb-8 text-h5-m sm:text-h5" id="reviews">
                {t('pages.place.reviews.title')}
            </h2>
            <div className="flex flex-col gap-y-8">
                {!place.isReviewed && <AddReviewButton placeId={place.id} />}
                <ReviewsFeed reviews={reviews} currentPage={parseInt(currentPage)} variant="place-page" />
            </div>
        </section>
    )
}
