import type { Metadata } from 'next'

import { PlaceEdit } from '@/components/features/place-form/place-edit'
import { ProtectClientRoute } from '@/components/ui/protect-client-route'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById } from '@/services/places'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `Edit | ${place.title} | ${countryName}`,
        robots: 'noindex, nofollow',
        alternates: {
            canonical: `/places/${params.id}/edit`,
        },
    }
}

export default async function EditPlacePage({ params }: { params: { locale: string; id: string } }) {
    const place = await getPlaceById(params.id)

    return (
        <ProtectClientRoute userId={place.author.id}>
            <PlaceEdit {...place} />
        </ProtectClientRoute>
    )
}
