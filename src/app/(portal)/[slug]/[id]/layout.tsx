import { ReactNode } from 'react'

import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'

import { getPlaceById } from '@/services/places'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'
import { getCountryByCode } from '@/utils/helpers/countries'
import { getPlacePath } from '@/utils/helpers/places'

type Params = Promise<{ slug: string; id: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params
    if (!/^\d+$/.test(params.id)) {
        notFound()
    }

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
    const placePath = getPlacePath(place.id, place.countryCode)

    return {
        title,
        description,
        alternates: {
            canonical: placePath,
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
            url: placePath,
        },
        twitter: {
            title,
            description,
            images: image,
        },
    }
}

export default function CountryPlaceLayout({ children }: { children: ReactNode }) {
    return children
}
