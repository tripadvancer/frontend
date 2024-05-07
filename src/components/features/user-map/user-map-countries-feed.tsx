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
        <div className="grid grid-cols-5 gap-4">
            {countries.map(country => (
                <div key={`country-${country}`} className="rounded-2xl bg-orange-10 p-4">
                    <div className="h1 text-orange-80">{country.count}</div>
                    <div className="h7">{getCountryByCode(country.code)?.name[locale]}</div>
                </div>
            ))}
        </div>
    )
}
