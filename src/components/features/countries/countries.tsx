import { FeedCountries } from '@/components/features/feed-countries/feed-countries'
import { getCountries } from '@/services/countries'
import { getI18n } from '@/utils/i18n/i18n.server'

export const Countries = async () => {
    const t = await getI18n()
    const countries = await getCountries()

    return (
        <section className="container py-24">
            <h1 className="h1 mb-16 text-center">{t('pages.countries.title')}</h1>
            <FeedCountries countries={countries} />
        </section>
    )
}
