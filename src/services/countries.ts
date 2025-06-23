import { notFound } from 'next/navigation'

import { countriesDictionary } from '@/utils/dictionaries/countries'
import { CountriesSortBy, OrderDirection } from '@/utils/enums'
import { ICountry, ICountryDict } from '@/utils/types/country'

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

export const getCountryByCode = (countryCode: ICountryDict['code'] | null | undefined): ICountryDict | undefined => {
    return countriesDictionary.find(country => country.code.toUpperCase() === countryCode)
}

export const getCountryBySlug = (countrySlug: ICountryDict['slug']): ICountryDict => {
    const country = countriesDictionary.find(country => country.slug === countrySlug)

    if (!country) {
        notFound()
    }

    return country
}
