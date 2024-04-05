import { getCountries } from '@/services/countries'
import { getUserCountryCode } from '@/services/edge-geo'
import { getI18n } from '@/utils/i18n/i18n.server'

import { LandingCountriesFeed } from './landing-countries-feed'

export const LandingCountries = async () => {
    const t = await getI18n()
    const countries = await getCountries()
    const userCountryCode = await getUserCountryCode()

    // Determine user's country
    const userCountry = countries.find(country => country.countryCode.toLowerCase() === userCountryCode)

    // Sort countries accordingly
    const sortCountries = userCountry
        ? [userCountry, ...countries.filter(country => country.countryCode.toLowerCase() !== userCountryCode)]
        : countries

    return (
        <section>
            <h1 className="h1 mb-4 text-center">{t('pages.landing.countries.title')}</h1>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                {t('pages.landing.countries.description')}
            </p>
            <LandingCountriesFeed countries={sortCountries} />
        </section>
    )
}
