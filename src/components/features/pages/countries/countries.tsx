import { getTranslations } from 'next-intl/server'

import { CountriesGrid } from '@/components/features/common/countries-grid/countries-grid'
import { Search } from '@/components/features/common/search/search'
import { getCountries } from '@/services/countries'

export const Countries = async () => {
    const t = await getTranslations()
    const countries = await getCountries()

    return (
        <div className="container py-24">
            <section>
                <h1 className="h1 mb-8 text-center">{t('page.countries.title')}</h1>
                <Search />
                <CountriesGrid countries={countries} />
            </section>
        </div>
    )
}
