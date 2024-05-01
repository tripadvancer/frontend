import { getCountryByCode } from '@/services/countries'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

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
        <div>
            {countries.map(country => (
                <div
                    key={`country-${country}`}
                    className="flex justify-between border-t border-dashed border-black-40 py-4 last:border-b"
                >
                    <div className="text-big-bold">{getCountryByCode(country.code)?.name[locale]}</div>
                    <div className="text-big">{country.count}</div>
                </div>
            ))}
        </div>
    )
}
