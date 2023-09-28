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
    const url = `${process.env.PORTAL_URL}/places/${params.id}`
    const title = `${place.title}${countryName ? `, ${countryName}` : ''} | Tripadvancer`
    const description = ''
    const image = place.cover + '/public' ?? ''

    return {
        title,
        description,
        openGraph: {
            url,
            type: 'website',
            title,
            description,
            images: [image],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image,
        },
    }
}

export default async function Place({ params }: { params: { id: string } }) {
    const place = await getPlaceById(params.id)
    const reviews = await getReviewsByPlaceId(params.id)

    return (
        <>
            <section className="mb-16">
                <h2 className="mb-8 text-2xl">Description of the place</h2>
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
