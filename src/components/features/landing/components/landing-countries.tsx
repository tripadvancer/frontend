import { FeedCountries } from '@/components/features/feed-countries/feed-countries'
import { ShowAllLink } from '@/components/ui/show-all-link'
import { getCountries } from '@/services/countries'
import { getI18n } from '@/utils/i18n/i18n.server'

export const LandingCountries = async () => {
    const t = await getI18n()
    const countries = await getCountries()

    return (
        <section>
            <h1 className="h1 mb-4 text-center">{t('pages.landing.countries.title')}</h1>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                {t('pages.landing.countries.description')}
            </p>
            <div className="flex flex-col gap-y-8">
                <FeedCountries countries={countries.slice(0, 12)} />
                <ShowAllLink href="/countries">{t('pages.landing.countries.view_all')}</ShowAllLink>
            </div>
        </section>
    )
}
