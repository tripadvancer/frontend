import { getTranslations } from 'next-intl/server'

import { CountriesGrid } from '@/components/features/common/countries-grid/countries-grid'
import { getCountries } from '@/services/countries'
import { getSettings } from '@/services/settings'

export const Countries = async () => {
    const t = await getTranslations()
    const countries = await getCountries()
    const settings = await getSettings()

    return (
        <div className="container py-24">
            <section>
                <div className="mb-16 text-center">
                    <h1 className="h1 mb-4">{t('page.countries.title')}</h1>
                    <p className="text-big text-black-70">
                        {settings.placesCount} places in {settings.countriesCount} countries
                    </p>
                </div>
                <CountriesGrid countries={countries} />
            </section>
        </div>
    )
}
