import { ICountryDict } from '@/utils/types/country'
import { IUserVisitedCountries } from '@/utils/types/user'

export function calculateWorldCoverage(
    visitedCountries: IUserVisitedCountries,
    countriesDictionary: ICountryDict[],
): number {
    if (!Array.isArray(visitedCountries) || !Array.isArray(countriesDictionary)) {
        throw new Error('Both arguments should be arrays')
    }
    if (countriesDictionary.length === 0) {
        throw new Error('The countriesDictionary should not be empty')
    }
    return Math.ceil((visitedCountries.length / countriesDictionary.length) * 100)
}
