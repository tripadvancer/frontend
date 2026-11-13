import { ReactNode } from 'react'

import { Metadata } from 'next/types'

import { getCountryBySlug } from '@/services/countries'
import { getCountryImage } from '@/utils/helpers/country-image'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params
    const country = await getCountryBySlug(params.slug)
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
