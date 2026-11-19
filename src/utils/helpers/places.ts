import { countriesDictionary } from '@/utils/dictionaries/countries'

export const getPlacePath = (placeId: number | string, countryCode: string | null | undefined): string => {
    const country = countriesDictionary.find(item => item.code === countryCode?.toUpperCase())

    return country ? `/${country.slug}/${placeId}` : `/places/${placeId}`
}
