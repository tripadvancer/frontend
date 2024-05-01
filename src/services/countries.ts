import { notFound } from 'next/navigation'

import type { ICountry, ICountryDict } from '@/utils/types/country'

import { сountriesDictionary } from '@/utils/dictionaries/countries'
import { CountriesSortBy, OrderDirection } from '@/utils/enums'

export async function getCountries(sortBy?: CountriesSortBy, orderDirection?: OrderDirection): Promise<ICountry[]> {
    const params = new URLSearchParams({
        sortBy: sortBy || CountriesSortBy.NAME,
        orderDirection: orderDirection || OrderDirection.ASC,
    })
    const url = process.env.NEXT_PUBLIC_API_URL + '/countries?' + params.toString()
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export const getCountryByCode = (
    countryCode: Pick<ICountryDict, 'code'>['code'] | null | undefined,
): ICountryDict | undefined => {
    return сountriesDictionary.find(country => country.code.toUpperCase() === countryCode)
}

export const getCountryBySlug = (countrySlug: Pick<ICountryDict, 'slug'>['slug']): ICountryDict => {
    const country = сountriesDictionary.find(country => country.slug === countrySlug)

    if (!country) {
        notFound()
    }

    return country
}
