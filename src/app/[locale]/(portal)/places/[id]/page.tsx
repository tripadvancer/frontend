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
    }
}

export default function PlacePage({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { page: string }
}) {
    return <Place placeId={params.id} reviewsCurrentPage={searchParams.page} />
}
