import { ReactNode } from 'react'

import type { Metadata } from 'next/types'

import { getCountryByCode } from '@/services/countries'
import { getPlaceById } from '@/services/places'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `${place.title} | ${countryName}`,
    }
}

export default function PlaceLayout({ children }: { children: ReactNode }) {
    return children
}
