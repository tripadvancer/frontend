import type { Metadata } from 'next/types'

import { getCountryNameByCode } from '@/utils/countries'

import { getPlaceById } from '@/services/places'
import { getReviewsByPlaceId } from '@/services/reviews'

import { DraftToHtml } from '@/components/DraftToHtml'
import { Review } from '@/components/Review'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const countryName = getCountryNameByCode(place.countryCode)

    return {
        title: `${place.title}${countryName ? `, ${countryName}` : ''} | Tripadvancer`,
        description: '',
    }
}

export default async function Place({ params }: { params: { id: string } }) {
    const place = await getPlaceById(params.id)
    const reviews = await getReviewsByPlaceId(params.id)

    return (
        <>
            <section className="mb-16">
                <h2 className="mb-8 text-2xl">About this place</h2>
                <DraftToHtml json={place.description} />
            </section>

            <section>
                <h2 className="mb-8 text-2xl">Visitor reviews</h2>
                <div>
                    {reviews.items.length === 0 && (
                        <div className="text-center text-sm text-custom-black-40">
                            There are no reviews yet. Be the first to leave a review.
                        </div>
                    )}
                    {reviews.items.map(review => (
                        <Review key={review.id} {...review} />
                    ))}
                </div>
            </section>
        </>
    )
}
