import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { getCountryByCode } from '@/services/countries'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

export const PlaceHeaderCountry = ({ countryCode }: IPlace) => {
    const locale = getCurrentLocale()
    const country = getCountryByCode(countryCode)

    return (
        <Link href={`/countries/${country?.slug}`} className="font-medium text-white hover:text-white">
            {country?.name[locale]}
        </Link>
    )
}
