import { countriesDictionary } from '@/utils/dictionaries/countries'
import { ICountryDict } from '@/utils/types/country'

export const getCountryByCode = (countryCode: ICountryDict['code'] | null | undefined): ICountryDict | undefined => {
    return countriesDictionary.find(country => country.code.toUpperCase() === countryCode?.toUpperCase())
}

export const findCountryBySlug = (countrySlug: ICountryDict['slug']): ICountryDict | undefined => {
    return countriesDictionary.find(country => country.slug === countrySlug)
}
