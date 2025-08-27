import { getLocale, getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { getCountryByCode } from '@/services/countries'

type PlaceHeaderCountryProps = {
    countryCode: string | null
}

export const PlaceHeaderCountry = async ({ countryCode }: PlaceHeaderCountryProps) => {
    const t = await getTranslations()
    const locale = await getLocale()
    const country = getCountryByCode(countryCode)

    if (!country) {
        return
    }

    return (
        <Link href={`/countries/${country.slug}`} className="font-medium text-blue-100 hover:text-blue-active">
            {t.rich('page.place.viewAll', { country: country.name[locale] })}
        </Link>
    )
}
