import { countriesDictionary } from '@/utils/dictionaries/countries'
import { getCountryByCode } from '@/utils/helpers/countries'
import { calculateWorldCoverage } from '@/utils/helpers/world-coverage'
import { IUserVisitedCountries } from '@/utils/types/user'

import { UserVisitedCountriesFeedItem } from './user-visited-countries-feed-item'

type UserVisitedCountriesFeedProps = {
    visitedCountries: IUserVisitedCountries
}

export const UserVisitedCountriesFeed = async ({ visitedCountries }: UserVisitedCountriesFeedProps) => {
    const worldCoverageInPercent = calculateWorldCoverage(visitedCountries, countriesDictionary)

    if (visitedCountries.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="bg-orange-10 flex items-center justify-between rounded-2xl p-4">
                <div className="h6">All countries</div>
                <div className="h6 text-blue-80">{`${worldCoverageInPercent}%`}</div>
            </div>

            {visitedCountries.map(item => {
                const country = getCountryByCode(item.code)

                if (country) {
                    return (
                        <UserVisitedCountriesFeedItem
                            key={`country-${country.code}`}
                            name={country.name}
                            count={item.count}
                            places={item.places}
                        />
                    )
                }
            })}
        </div>
    )
}
