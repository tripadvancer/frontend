import Link from 'next/link'

import { getCountryByCode } from '@/services/countries'

type PlaceHeaderCountryProps = {
    countryCode: string | null
}

export const PlaceHeaderCountry = async ({ countryCode }: PlaceHeaderCountryProps) => {
    const country = getCountryByCode(countryCode)

    if (!country) {
        return
    }

    return (
        <Link href={`/countries/${country.slug}`} className="hover:text-blue-active font-medium text-blue-100">
            View all places in {country.name}
        </Link>
    )
}
