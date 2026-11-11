import { TentTreeIcon } from 'lucide-react'

import Link from 'next/link'

import { JsonLd } from '@/components/features/common/json-ld'
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
    const categoriesIds = categoriesDictionary.map(category => category.id)
    const selectedCategoriesIds = parseQueryString(categoriesIdsFromQueryString, categoriesIds)
    const places = await getPlacesByCountryCode(country.code, selectedCategoriesIds.join())
    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string
    const countryUrl = `${baseUrl}/countries/${country.slug}`

    return (
        <>
            <JsonLd
                data={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                            { '@type': 'ListItem', position: 2, name: 'Countries', item: `${baseUrl}/countries` },
                            { '@type': 'ListItem', position: 3, name: country.name, item: countryUrl },
                        ],
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: `Places to visit in ${country.name}`,
                        itemListElement: places.map((place, index) => ({
                            '@type': 'ListItem',
                            position: index + 1,
                            item: {
                                '@type': 'Place',
                                name: place.title,
                                url: `${baseUrl}/places/${place.id}`,
                            },
                        })),
                    },
                ]}
            />
            <section className="container space-y-8 py-16 sm:space-y-16">
                <div className="space-y-8 sm:w-3/4">
                    <div className="space-y-4">
                        <Link href="/countries" className="hover:text-blue-active font-medium text-blue-100">
                            View all countries
                        </Link>
                        <h1 className="h1 max-w-full break-words">Places to visit in {country.name}</h1>
                        <p className="text-big text-black-70">
                            {`Explore ${country.name} through traveler-recommended attractions, scenic places, and things to do. Browse local recommendations by category and plan your visit.`}
                        </p>
                    </div>

                    <CountryCategories selectedCategoryIds={selectedCategoriesIds} />
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
                        <div className="flex-center text-black-40 flex-col gap-y-8 py-16 sm:py-32">
                            <div className="flex flex-col items-center gap-y-4">
                                <TentTreeIcon size={96} strokeWidth={1} />
                                <div className="text-center">
                                    There are no places here yet.
                                    <br />
                                    Be the first to add one and help others discover something new!
                                </div>
                            </div>
                            <CountryAddPlaceWithAuth />
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
