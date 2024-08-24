import { getLocale } from 'next-intl/server'

import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { getCountryByCode } from '@/services/countries'

export const PlaceHeaderCountry = async ({ countryCode }: IPlace) => {
    const locale = await getLocale()
    const country = getCountryByCode(countryCode)

    if (!country) {
        return null
    }

    return (
        <Link href={`/countries/${country.slug}`} className="font-medium text-white hover:text-white">
            {country.name[locale]}
        </Link>
    )
}
