import { notFound } from 'next/navigation'

import type { ICountry, ICountryDict } from '@/utils/types/country'

import { сountriesDictionary } from '@/utils/dictionaries/countries'

export async function getCountries(): Promise<ICountry[]> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/countries'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export const getCountryByCode = (countryCode: Pick<ICountryDict, 'code'>['code']): ICountryDict | undefined => {
    return сountriesDictionary.find(country => country.code === countryCode)
}

export const getCountryBySlug = (countrySlug: Pick<ICountryDict, 'slug'>['slug']): ICountryDict => {
    const country = сountriesDictionary.find(country => country.slug === countrySlug)

    if (!country) {
        notFound()
    }

    return country
}
