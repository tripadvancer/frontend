import type { Metadata } from 'next'

import { EditPlace } from '@/components/features/place-form/edit-place'
import { ProtectClientRoute } from '@/components/ui/protect-client-route'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById } from '@/services/places'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `Edit | ${place.title} | ${countryName}`,
    }
}

export default async function EditPlacePage({ params }: { params: { locale: string; id: string } }) {
    return <ProtectClientRoute component={<EditPlace placeId={params.id} />} />
}
