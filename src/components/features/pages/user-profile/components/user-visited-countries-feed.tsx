import { getLocale, getTranslations } from 'next-intl/server'

import type { IUserVisitedCountries } from '@/utils/types/user'

import { getCountryByCode } from '@/services/countries'
import { сountriesDictionary } from '@/utils/dictionaries/countries'

import { UserVisitedCountriesFeedItem } from './user-visited-countries-feed-item'

export const UserVisitedCountriesFeed = async ({ visitedCountries }: IUserVisitedCountries) => {
    const t = await getTranslations()
    const locale = await getLocale()
    const worldCoverageInPercent = Math.round((visitedCountries.length / сountriesDictionary.length) * 100)

    if (visitedCountries.length === 0) {
        return null
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
            <UserVisitedCountriesFeedItem
                variant="blue"
                count={`${worldCoverageInPercent}%`}
                name={t('page.user.profile.visitedCountries.allcountries')}
            />

            {visitedCountries.map(item => {
                const country = getCountryByCode(item.code)

                if (country) {
                    return (
                        <UserVisitedCountriesFeedItem
                            key={`country-${country.code}`}
                            variant="orange"
                            count={item.count.toString()}
                            name={country.name[locale]}
                        />
                    )
                }
            })}
        </div>
    )
}
