import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { getCountryByCode } from '@/services/countries'

type CountryProps = IPlace & {
    locale: string
}

export const Country = ({ countryCode, locale }: CountryProps) => {
    const country = getCountryByCode(countryCode.toUpperCase())

    return (
        <Link href={`/countries/${country?.slug}`} className="font-medium text-white hover:text-white">
            {country?.name[locale]}
        </Link>
    )
}
