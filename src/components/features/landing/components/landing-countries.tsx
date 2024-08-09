import { getTranslations } from 'next-intl/server'

import { FeedCountries } from '@/components/features/feed-countries/feed-countries'
import { Search } from '@/components/features/search/search'
import { ShowAllLink } from '@/components/ui/show-all-link'
import { getCountries } from '@/services/countries'
import { CountriesSortBy, OrderDirection } from '@/utils/enums'
import { getI18n } from '@/utils/i18n/i18n.server'

export const LandingCountries = async () => {
    const t = await getI18n()
    const t2 = await getTranslations('HomePage')
    const countries = await getCountries(CountriesSortBy.POPULARITY, OrderDirection.DESC)

    return (
        <section>
            <h1>{t2('title')}</h1>
            <h1 className="h1 mb-4 text-center">{t('landing.countries.title')}</h1>
            <p className="m-auto mb-8 w-full text-center text-big text-black-70 sm:w-2/3">
                {t('landing.countries.text')}
            </p>
            <Search />
            <div className="flex flex-col gap-y-8">
                <FeedCountries countries={countries.slice(0, 12)} />
                <ShowAllLink href="/countries">{t('landing.countries.button')}</ShowAllLink>
            </div>
        </section>
    )
}
