import { ReactNode } from 'react'

import { Metadata } from 'next/types'

import { getCountryBySlug } from '@/services/countries'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params
    const country = getCountryBySlug(params.slug)
    const countryName = country.name
    const title = `Best Places to Visit in ${countryName}`
    const description = `Explore ${countryName} through traveler-recommended attractions, scenic places, and things to do. Browse local recommendations by category and plan your visit.`

    return {
        title,
        description,
        alternates: {
            canonical: `/countries/${params.slug}`,
        },
        openGraph: {
            title,
            description,
            images: [
                {
                    url: `/images/countries/public/${country.code.toLowerCase()}.jpg`,
                    width: 1920,
                    height: 1280,
                    type: 'image/jpeg',
                    alt: countryName,
                },
            ],
            url: `/countries/${params.slug}`,
        },
        twitter: {
            title,
            description,
            images: `/images/countries/public/${country.code.toLowerCase()}.jpg`,
        },
    }
}

export default function CountryLayout({ children }: { children: ReactNode }) {
    return children
}
