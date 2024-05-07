import { getCountryByCode } from '@/services/countries'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

import { UserMapCountriesFeedItem } from './user-map-countries-feed-item'

type UserMapCountriesFeedProps = {
    countries: {
        code: string
        count: number
    }[]
}

export const UserMapCountriesFeed = ({ countries }: UserMapCountriesFeedProps) => {
    const locale = getCurrentLocale()

    if (countries.length === 0) {
        return (
            <div className="text-center text-black-40">
                You have not visited any countries yet.
                <br />
                To view your visited countries, add a place you have been to.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-5 gap-8">
            <UserMapCountriesFeedItem variant="blue" count="3%" name="World" />

            {countries.map(item => {
                const country = getCountryByCode(item.code)

                if (country) {
                    return (
                        <UserMapCountriesFeedItem
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
