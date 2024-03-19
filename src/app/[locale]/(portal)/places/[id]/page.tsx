import type { Metadata } from 'next/types'

import { Place } from '@/components/features/place/place'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById } from '@/services/places'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `${place.title} | ${countryName}`,
        description: `Discover ${place.title} in ${countryName} with Tripadvancer. Plan your unforgettable journey now with our comprehensive travel guides and insider tips. Start your adventure today!`,
        alternates: {
            canonical: `/places/${params.id}`,
        },
    }
}

export default function PlacePage({ params }: { params: { id: string } }) {
    return <Place placeId={params.id} />
}
