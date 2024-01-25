import { ReactNode } from 'react'

import type { Metadata } from 'next/types'

import { getCountryBySlug } from '@/services/countries'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const country = getCountryBySlug(params.slug)
    const countryName = country?.name['en'] ?? ''

    return {
        title: countryName,
        description: `Discover ${countryName} with Tripadvancer, find interesting places and go to an amazing trip.`,
        openGraph: {
            title: countryName,
            description: `Discover ${countryName} with Tripadvancer, find interesting places and go to an amazing trip.`,
            images: [
                {
                    url: `https://source.unsplash.com/1920x1280/?${countryName}`,
                    width: 1920,
                    height: 1280,
                    type: 'image/jpeg',
                    alt: countryName,
                },
            ],
        },
        twitter: {
            title: countryName,
            description: `Discover ${countryName} with Tripadvancer, find interesting places and go to an amazing trip.`,
            images: `https://source.unsplash.com/1920x1280/?${countryName}`,
        },
    }
}

export default function CountryLayout({ children }: { children: ReactNode }) {
    return children
}
