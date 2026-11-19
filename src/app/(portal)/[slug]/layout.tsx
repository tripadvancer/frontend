import { ReactNode } from 'react'

import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'

import { findCountryBySlug } from '@/utils/helpers/countries'
import { getCountryImage } from '@/utils/helpers/country-image'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params
    // The layout also wraps place pages, so a country without public places must not hide them.
    // The country page itself checks that the country has public places.
    const country = findCountryBySlug(params.slug)

    if (!country) {
        notFound()
    }

    const countryName = country.name
    const title = `Best Places to Visit in ${countryName}`
    const description = `Explore ${countryName} through traveler-recommended attractions, scenic places, and things to do. Browse local recommendations by category and plan your visit.`
    const image = getCountryImage(country.code)

    return {
        title,
        description,
        alternates: {
            canonical: `/${params.slug}`,
        },
        openGraph: {
            title,
            description,
            images: [
                {
                    ...image,
                    type: 'image/jpeg',
                    alt: `Illustrated cover for ${countryName}`,
                },
            ],
            url: `/${params.slug}`,
        },
        twitter: {
            title,
            description,
            images: image.url,
        },
    }
}

export default function CountryLayout({ children }: { children: ReactNode }) {
    return children
}
