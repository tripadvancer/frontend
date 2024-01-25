import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getCountryBySlug } from '@/services/countries'
import { getPlacesByCountryCode } from '@/services/places'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { parseQueryString } from '@/utils/helpers'
import { getI18n } from '@/utils/i18n/i18n.server'

import { Categories } from './_components/categories'
import { PlacesFeed } from './_components/places-feed'
import { PlacesFeedSkeleton } from './_components/places-feed-skeleton'

export default async function CountryPage({
    params,
    searchParams,
}: {
    params: { slug: string; locale: string }
    searchParams: { categories: string }
}) {
    const t = await getI18n()
    const country = getCountryBySlug(params.slug)
    const categoriesIds = categoriesDictionary.map(category => category.id)
    const selectedCategoriesIdsFromQueryString = searchParams.categories?.toString().toLowerCase()
    const selectedCategoriesIds = parseQueryString(selectedCategoriesIdsFromQueryString, categoriesIds)
    const places = await getPlacesByCountryCode(country.code, selectedCategoriesIds.join())

    return (
        <div className="flex flex-col">
            <div className="flex-center relative z-10 -mb-8 flex-[540px] pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    <Image
                        src={`https://source.unsplash.com/1920x1280/?${country.name[params.locale]}`}
                        className="object-cover"
                        alt={country.name[params.locale]}
                        fill
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
                </div>
                <section className="container relative z-30 py-8 text-center">
                    <div className="m-auto sm:w-2/3">
                        <Link href="/" className="mb-4 inline-block font-medium text-white hover:text-white">
                            {t('pages.country.view_all')}
                        </Link>
                        <h1 className="mb-4 text-h1-m text-white sm:text-h1">{country.name[params.locale]}</h1>
                        <p className="text-big text-white">
                            {t('pages.country.description', { country: country.name[params.locale] })}
                        </p>
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container flex flex-col gap-y-16 py-24">
                    <Categories selectedCategoryIds={selectedCategoriesIds} locale={params.locale} />
                    <Suspense fallback={<PlacesFeedSkeleton />}>
                        <PlacesFeed places={places} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
