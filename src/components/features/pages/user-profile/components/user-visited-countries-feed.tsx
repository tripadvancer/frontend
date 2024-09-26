import { getLocale, getTranslations } from 'next-intl/server'

import { getCountryByCode } from '@/services/countries'
import { сountriesDictionary } from '@/utils/dictionaries/countries'

import { UserVisitedCountriesFeedItem } from './user-visited-countries-feed-item'

type UserMapCountriesFeedProps = {
    countries: {
        code: string
        count: number
    }[]
}

export const UserVisitedCountriesFeed = async ({ countries }: UserMapCountriesFeedProps) => {
    const t = await getTranslations()
    const locale = await getLocale()
    const worldCoverageInPercent = Math.round((countries.length / сountriesDictionary.length) * 100)

    if (countries.length === 0) {
        return (
            <div className="text-center text-black-40">
                {t.rich('page.user.profile.visitedCountries.emptyMessage', { br: () => <br /> })}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
            <UserVisitedCountriesFeedItem
                variant="blue"
                count={`${worldCoverageInPercent}%`}
                name={t('page.user.profile.visitedCountries.allcountries')}
            />

            {countries.map(item => {
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
