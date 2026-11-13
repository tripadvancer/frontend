import 'server-only'

import { notFound } from 'next/navigation'

import { CountriesSortBy, OrderDirection } from '@/utils/enums'
import { findCountryBySlug } from '@/utils/helpers/countries'
import { ICountry } from '@/utils/types/country'

export async function getCountries(sortBy?: CountriesSortBy, orderDirection?: OrderDirection): Promise<ICountry[]> {
    const params = new URLSearchParams({
        sortBy: sortBy || CountriesSortBy.NAME,
        orderDirection: orderDirection || OrderDirection.ASC,
    })
    const url = process.env.NEXT_PUBLIC_API_URL + '/countries?' + params.toString()
    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

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
