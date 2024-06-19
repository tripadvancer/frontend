import { Suspense } from 'react'

import Link from 'next/link'

import type { ICountryDict } from '@/utils/types/country'

import { FeedPlacesSkeleton } from '@/components/features/feed-places/feed-places-skeleton'
import { MapIcon16 } from '@/components/ui/icons'
import { getPlacesByCountryCode } from '@/services/places'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { parseQueryString } from '@/utils/helpers/common'
import { getCurrentLocale, getI18n } from '@/utils/i18n/i18n.server'

import { CountryAddPlaceWithAuth } from './components/country-add-place-with-auth'
import { CountryCategories } from './components/country-categories'
import { CountryCover } from './components/country-cover'
import { CountryPlaces } from './components/country-places'

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
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-50" />
                </div>
                <section className="container relative z-30 py-8 text-center">
                    <div className="m-auto sm:w-2/3">
                        <Link href="/countries" className="mb-4 inline-block font-medium text-white hover:text-white">
                            {t('pages.country.view_all')}
                        </Link>
                        <h1 className="h1 mb-4 text-white">{country.name[locale]}</h1>
                        <p className="mb-4 text-big text-white">
                            {t('pages.country.description', { country: country.name[locale] })}
                        </p>
                        <div className="flex-center cursor-pointer gap-x-2 text-white">
                            <MapIcon16 />
                            Show on map
                        </div>
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container flex flex-col gap-y-16 py-24">
                    <CountryCategories selectedCategoryIds={selectedCategoriesIds} locale={locale} />

                    {places.length !== 0 && (
                        <Suspense fallback={<FeedPlacesSkeleton />}>
                            <CountryPlaces places={places} />
                        </Suspense>
                    )}

                    {places.length === 0 && (
                        <div className="flex-center flex-col gap-y-8">
                            <div className="text-center text-black-40">{t('pages.country.places.empty')}</div>
                            <CountryAddPlaceWithAuth />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
