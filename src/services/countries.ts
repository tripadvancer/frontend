import 'server-only'

import { notFound } from 'next/navigation'

import { apiFetch } from '@/services/api'
import { CountriesSortBy, OrderDirection } from '@/utils/enums'
import { findCountryBySlug } from '@/utils/helpers/countries'
import { ICountry } from '@/utils/types/country'

export async function getCountries(
    sort: CountriesSortBy = CountriesSortBy.POPULARITY,
    direction: OrderDirection = OrderDirection.DESC,
): Promise<ICountry[]> {
    const params = new URLSearchParams({ sort, direction })
    return apiFetch(`countries?${params}`, { next: { revalidate: 3600 } })
}

// Only countries with published places have a page
export async function getCountryBySlug(slug: string) {
    const country = findCountryBySlug(slug)

    if (!country) {
        notFound()
    }

    const countries = await getCountries()

    if (!countries.some(item => item.countryCode.toLowerCase() === country.code.toLowerCase())) {
        notFound()
    }

    return country
}
