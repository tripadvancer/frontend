import { getTranslations } from 'next-intl/server'

import { FeedCountries } from '@/components/features/common/feed-countries/feed-countries'
import { Search } from '@/components/features/common/search/search'
import { ShowAllLink } from '@/components/ui/show-all-link'
import { getCountries } from '@/services/countries'
import { CountriesSortBy, OrderDirection } from '@/utils/enums'

export const LandingCountries = async () => {
    const t = await getTranslations()
    const countries = await getCountries(CountriesSortBy.POPULARITY, OrderDirection.DESC)

    return (
        <section>
            <h1 className="h1 mb-4 text-center">{t('page.landing.countries.title')}</h1>
            <p className="m-auto mb-8 w-full text-center text-big text-black-70 sm:w-2/3">
                {t('page.landing.countries.text')}
            </p>
            <Search />
            <div className="flex flex-col gap-y-8">
                <FeedCountries countries={countries.slice(0, 12)} />
                <ShowAllLink href="/countries">{t('page.landing.countries.button')}</ShowAllLink>
            </div>
        </section>
    )
}
