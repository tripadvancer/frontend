import { getLocale, getTranslations } from 'next-intl/server'

import { getCountryByCode } from '@/services/countries'
import { countriesDictionary } from '@/utils/dictionaries/countries'
import { calculateWorldCoverage } from '@/utils/helpers/world-coverage'
import { IUserVisitedCountries } from '@/utils/types/user'

import { UserVisitedCountriesFeedItem } from './user-visited-countries-feed-item'

type UserVisitedCountriesFeedProps = {
    visitedCountries: IUserVisitedCountries
}

export const UserVisitedCountriesFeed = async ({ visitedCountries }: UserVisitedCountriesFeedProps) => {
    const t = await getTranslations()
    const locale = await getLocale()
    const worldCoverageInPercent = calculateWorldCoverage(visitedCountries, countriesDictionary)

    if (visitedCountries.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-orange-10 p-4">
                <div className="h6">{t('page.user.profile.visitedCountries.allcountries')}</div>
                <div className="h6 text-blue-80">{`${worldCoverageInPercent}%`}</div>
            </div>

            {visitedCountries.map(item => {
                const country = getCountryByCode(item.code)

                if (country) {
                    return (
                        <UserVisitedCountriesFeedItem
                            key={`country-${country.code}`}
                            name={country.name[locale]}
                            count={item.count}
                            places={item.places}
                        />
                    )
                }
            })}
        </div>
    )
}
