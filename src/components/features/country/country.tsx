import { Suspense } from 'react'

import Link from 'next/link'

import type { ICountryDict } from '@/utils/types/country'

import { getPlacesByCountryCode } from '@/services/places'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { parseQueryString } from '@/utils/helpers/common'
import { getCurrentLocale, getI18n } from '@/utils/i18n/i18n.server'

import { CountryCategories } from './components/country-categories'
import { CountryCover } from './components/country-cover'
import { CountryPlaces } from './components/country-places'
import { CountryPlacesSkeleton } from './components/places-feed-skeleton'

export const Country = async ({
    country,
    categoriesIdsFromQueryString,
}: {
    country: ICountryDict
    categoriesIdsFromQueryString: string
}) => {
    const t = await getI18n()
    const locale = getCurrentLocale()
    const categoriesIds = categoriesDictionary.map(category => category.id)
    const selectedCategoriesIds = parseQueryString(categoriesIdsFromQueryString, categoriesIds)
    const places = await getPlacesByCountryCode(country.code, selectedCategoriesIds.join())

    return (
        <div className="flex flex-col">
            <div className="flex-center relative z-10 -mb-8 flex-[540px] pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    <CountryCover countryCode={country.code} />
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
                </div>
                <section className="container relative z-30 py-8 text-center">
                    <div className="m-auto sm:w-2/3">
                        <Link href="/" className="mb-4 inline-block font-medium text-white hover:text-white">
                            {t('pages.country.view_all')}
                        </Link>
                        <h1 className="h1 mb-4 text-white">{country.name[locale]}</h1>
                        <p className="text-big text-white">
                            {t('pages.country.description', { country: country.name[locale] })}
                        </p>
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container flex flex-col gap-y-16 py-24">
                    <CountryCategories selectedCategoryIds={selectedCategoriesIds} locale={locale} />
                    <Suspense fallback={<CountryPlacesSkeleton />}>
                        <CountryPlaces places={places} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
