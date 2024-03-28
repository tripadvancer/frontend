import type { Metadata } from 'next/types'

import { getCountryBySlug } from '@/services/countries'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const country = getCountryBySlug(params.slug)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `What To Visit In ${countryName}`,
        description: `Discover ${countryName} with Tripadvancer, find interesting places and go to an amazing trip.`,
        alternates: {
            canonical: `/countries/${params.slug}`,
        },
        openGraph: {
            title: `What To Visit In ${countryName}`,
            description: `Discover ${countryName} with Tripadvancer, find interesting places and go to an amazing trip.`,
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
            title: `What To Visit In ${countryName}`,
            description: `Discover ${countryName} with Tripadvancer, find interesting places and go to an amazing trip.`,
            images: `/images/countries/public/${country.code.toLowerCase()}.jpg`,
        },
    }
}

export default function CountryLayout({ children }: { children: React.ReactNode }) {
    return children
}
