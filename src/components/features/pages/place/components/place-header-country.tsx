import { getLocale } from 'next-intl/server'

import Link from 'next/link'

import { getCountryByCode } from '@/services/countries'
import { IPlace } from '@/utils/types/place'

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
