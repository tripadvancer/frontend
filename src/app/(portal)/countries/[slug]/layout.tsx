import { ReactNode } from 'react'

import { Metadata } from 'next/types'

import { getCountryBySlug } from '@/services/countries'

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params
    const country = getCountryBySlug(params.slug)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `What To Visit In ${countryName}`,
        description: `Discover the best places to visit in ${countryName}, curated by fellow travelers who know it best. Find out the top things to do in ${countryName} based on insider recommendations.`,
        keywords: `${countryName}, travel, tourism, vacation, holiday, trip, journey, adventure, guide, tips, what to see in ${countryName}, attractions of ${countryName}, spending weekends in ${countryName}, planning a trip around ${countryName} ,tourism in ${countryName}, things to do in ${countryName}`,
        alternates: {
            canonical: `/countries/${params.slug}`,
        },
        openGraph: {
            title: `What To Visit In ${countryName}`,
            description: `Discover the best places to visit in ${countryName}, curated by fellow travelers who know it best. Find out the top things to do in ${countryName} based on insider recommendations.`,
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
            description: `Discover the best places to visit in ${countryName}, curated by fellow travelers who know it best. Find out the top things to do in ${countryName} based on insider recommendations.`,
            images: `/images/countries/public/${country.code.toLowerCase()}.jpg`,
        },
    }
}

export default function CountryLayout({ children }: { children: ReactNode }) {
    return children
}
