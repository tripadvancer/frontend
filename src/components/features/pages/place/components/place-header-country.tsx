import { getLocale } from 'next-intl/server'

import Link from 'next/link'

import { getCountryByCode } from '@/services/countries'

type PlaceHeaderCountryProps = {
    countryCode: string | null
}

export const PlaceHeaderCountry = async ({ countryCode }: PlaceHeaderCountryProps) => {
    const locale = await getLocale()
    const country = getCountryByCode(countryCode)

    if (!country) {
        return
    }

    return (
        <Link href={`/countries/${country.slug}`} className="font-medium text-white hover:text-white">
            {country.name[locale]}
        </Link>
    )
}
