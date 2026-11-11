import { countriesDictionary } from '@/utils/dictionaries/countries'
import { api } from '@/utils/redux/services/api'
import { ICountryDict } from '@/utils/types/country'
import { ISearchItem, ISearchResult, SearchInputs } from '@/utils/types/search'

const countryAliases: Record<string, string[]> = {
    AE: ['UAE'],
    BO: ['Bolivia Plurinational State of'],
    BN: ['Brunei Darussalam'],
    CD: ['DRC', 'Congo Kinshasa', 'Democratic Republic of the Congo'],
    CG: ['Congo Brazzaville', 'Republic of the Congo'],
    CI: ['Ivory Coast', "Cote d'Ivoire"],
    CV: ['Cape Verde'],
    CZ: ['Czech Republic'],
    GB: ['UK', 'Great Britain', 'Britain', 'United Kingdom'],
    IR: ['Iran Persia'],
    KP: ['North Korea', 'DPRK'],
    KR: ['South Korea', 'Republic of Korea'],
    LA: ['Laos'],
    MM: ['Burma'],
    MK: ['Macedonia'],
    NL: ['Holland'],
    PS: ['State of Palestine'],
    RU: ['Russian Federation'],
    SZ: ['Swaziland'],
    TL: ['East Timor'],
    TR: ['Turkey'],
    TW: ['Taiwan', 'Republic of China'],
    US: ['USA', 'US', 'United States of America'],
    VA: ['Vatican City', 'Holy See'],
    VN: ['Viet Nam'],
}

export const searchAPI = api.injectEndpoints({
    endpoints: build => ({
        search: build.query<ISearchResult, SearchInputs>({
            query: ({ query }) => `search?query=${query}`,
            transformResponse: (returnValue: ISearchResult, meta, arg) => {
                // Add countries to the response
                const searchQuery = arg.query.toLowerCase()
                const countriesData = countriesDictionary.filter(country => {
                    const nameMatches = country.name.toLowerCase().includes(searchQuery)
                    const aliasMatches = countryAliases[country.code]?.some(alias =>
                        alias.toLowerCase().includes(searchQuery),
                    )

                    return nameMatches || aliasMatches
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
