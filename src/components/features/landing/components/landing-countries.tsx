import { getCountries } from '@/services/countries'
import { getI18n } from '@/utils/i18n/i18n.server'

import { LandingCountriesFeed } from './landing-countries-feed'

export const LandingCountries = async () => {
    const t = await getI18n()
    const countries = await getCountries()

    return (
        <section>
            <h1 className="mb-4 text-center text-h1-m sm:text-h1">{t('pages.landing.countries.title')}</h1>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                {t('pages.landing.countries.description')}
            </p>
            <LandingCountriesFeed countries={countries} />
        </section>
    )
}
