import Link from 'next/link'

import { getCountryByCode } from '@/utils/helpers/countries'

type PlaceHeaderCountryProps = {
    countryCode: string | null
}

export const PlaceHeaderCountry = async ({ countryCode }: PlaceHeaderCountryProps) => {
    const country = getCountryByCode(countryCode)

    if (!country) {
        return
    }

    return (
        <Link href={`/${country.slug}`} className="hover:text-blue-active inline-block font-medium text-blue-100">
            View all places in {country.name}
        </Link>
    )
}
