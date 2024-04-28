import type { ICountryDict } from '@/utils/types/country'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem, ISearchResult } from '@/utils/types/search'

import { getCountryByCode } from '@/services/countries'

export const transformSearchCoordinates = (data: ISearchResult): ISearchItem<ILocationPreview>[] => {
    return data.coordinates.map(coordinate => ({ ...coordinate }))
}

export const transformSearchLocations = (data: ISearchResult): ISearchItem<ILocationPreview>[] => {
    return data.locations.map(location => ({ ...location }))
}

export const transformSearchPlaces = (data: ISearchResult, locale: string): ISearchItem<IPlacePreview>[] => {
    return data.places.map(place => ({
        ...place,
        info: getCountryByCode(place.properties.countryCode)?.name[locale] ?? '',
    }))
}

export const transformSearchCountries = (data: ISearchResult, locale: string): ISearchItem<ICountryDict>[] => {
    return data.countries.map(country => ({
        ...country,
        title: country.properties.name[locale],
        info: country.properties.code,
    }))
}

export const transformFullSearchResult = (
    data: ISearchResult,
    locale: string,
): ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>[] => {
    return [
        ...transformSearchCoordinates(data),
        ...transformSearchCountries(data, locale),
        ...transformSearchPlaces(data, locale),
        ...transformSearchLocations(data),
    ]
}
