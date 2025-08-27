import { TentTreeIcon } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { getPlacesByCountryCode } from '@/services/places'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { parseQueryString } from '@/utils/helpers/common'
import { ICountryDict } from '@/utils/types/country'

import { CountryAddPlaceWithAuth } from './components/country-add-place-with-auth'
import { CountryCategories } from './components/country-categories'
import { CountryPlaces } from './components/country-places'

export const Country = async ({
    country,
    categoriesIdsFromQueryString,
}: {
    country: ICountryDict
    categoriesIdsFromQueryString: string
}) => {
    const t = await getTranslations()
    const locale = await getLocale()
    const categoriesIds = categoriesDictionary.map(category => category.id)
    const selectedCategoriesIds = parseQueryString(categoriesIdsFromQueryString, categoriesIds)
    const places = await getPlacesByCountryCode(country.code, selectedCategoriesIds.join())

    return (
        <section className="container space-y-8 py-16 sm:space-y-16">
            <div className="space-y-8 sm:w-3/4">
                <div className="space-y-4">
                    <Link href="/countries" className="font-medium text-blue-100 hover:text-blue-active">
                        {t('page.country.viewAll')}
                    </Link>
                    <h1 className="h1 max-w-full break-words">{country.name[locale]}</h1>
                    <p className="text-big text-black-70">
                        {t('page.country.description', { country: country.name[locale] })}
                    </p>
                </div>

                <CountryCategories selectedCategoryIds={selectedCategoriesIds} locale={locale} />
            </div>

            <div>
                {places.length !== 0 && (
                    <CountryPlaces
                        places={places.map(place => ({
                            id: place.id,
                            title: place.title,
                            cover: place.cover,
                            rating: {
                                avgRating: place.avgRating,
                                reviewsCount: place.reviewsCount,
                            },
                        }))}
                    />
                )}

                {places.length === 0 && (
                    <div className="flex-center flex-col gap-y-8 py-16 text-black-40 sm:py-32">
                        <div className="flex flex-col items-center gap-y-4">
                            <TentTreeIcon size={96} strokeWidth={1} />
                            <div className="text-center">
                                {t.rich('page.country.emptyPlaces', { br: () => <br /> })}
                            </div>
                        </div>
                        <CountryAddPlaceWithAuth />
                    </div>
                )}
            </div>
        </section>
    )
}
