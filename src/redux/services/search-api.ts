import { date } from 'yup'

import { сountriesDictionary } from '@/utils/dictionaries/countries'
import { ICountryDict } from '@/utils/types/country'
import { ISearchItem, ISearchResult, SearchInputs } from '@/utils/types/search'

import { api } from './api'

export const searchAPI = api.injectEndpoints({
    endpoints: build => ({
        search: build.query<ISearchResult, SearchInputs>({
            query: ({ query }) => `search?query=${query}`,
            transformResponse: (returnValue: ISearchResult, meta, arg) => {
                // Add countries to the response
                const countriesData = сountriesDictionary.filter(country => {
                    return country.name['en'].toLowerCase().includes(arg.query.toLowerCase())
                })
                const countriesSearchResult: ISearchItem<ICountryDict>[] = countriesData.map(country => ({
                    title: '',
                    info: '',
                    coordinates: { lat: 0, lng: 0 },
                    type: 'country',
                    properties: country,
                }))

                return {
                    ...returnValue,
                    countries: countriesSearchResult.slice(0, 4),
                }
            },
        }),
    }),
    overrideExisting: false,
})
