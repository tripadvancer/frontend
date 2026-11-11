import { Metadata } from 'next/types'

import { Place } from '@/components/features/pages/place/place'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById } from '@/services/places'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

type Params = Promise<{ id: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name
    const placeDescription = place.description
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    const description = placeDescription
        ? `${place.title}${countryName ? ` in ${countryName}` : ''}: ${placeDescription}`.slice(0, 160)
        : `Explore ${place.title}${countryName ? ` in ${countryName}` : ''}. View photos, visitor reviews, and location details, then save this place to your trip list.`
    const title = countryName ? `${place.title} in ${countryName}` : place.title
    const image = place.cover ? makeImageUrl(place.cover, ImageVariants.PUBLIC) : '/images/place-cover-placeholder.jpg'

    return {
        title,
        description,
        alternates: {
            canonical: `/places/${params.id}`,
        },
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                    width: 1920,
                    height: 1280,
                    type: 'image/jpeg',
                    alt: place.title,
                },
            ],
            url: `/places/${params.id}`,
        },
        twitter: {
            title,
            description,
            images: image,
        },
    }
}

export default async function PlacePage(props: { params: Params }) {
    const params = await props.params
    return <Place placeId={params.id} />
}
