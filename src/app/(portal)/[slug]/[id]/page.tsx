import { notFound, permanentRedirect } from 'next/navigation'

import { Place } from '@/components/features/pages/place/place'
import { getPlaceById } from '@/services/places'
import { findCountryBySlug, getCountryByCode } from '@/utils/helpers/countries'
import { getPlacePath } from '@/utils/helpers/places'

type Params = Promise<{ slug: string; id: string }>

export default async function CountryPlacePage(props: { params: Params }) {
    const params = await props.params
    const requestedCountry = findCountryBySlug(params.slug)

    if (!requestedCountry) {
        notFound()
    }

    if (!/^\d+$/.test(params.id)) {
        notFound()
    }

    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)

    if (!country) {
        notFound()
    }

    if (country.slug !== requestedCountry.slug) {
        permanentRedirect(getPlacePath(place.id, place.countryCode))
    }

    return <Place place={place} />
}
