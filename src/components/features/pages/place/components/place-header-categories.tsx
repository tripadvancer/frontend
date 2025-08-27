import { getLocale } from 'next-intl/server'

import Link from 'next/link'

import { getCountryByCode } from '@/services/countries'
import { categoriesDictionary } from '@/utils/dictionaries/categories'

type PlaceHeaderCategoriesProps = {
    countryCode: string | null
    categories: number[]
}

export const PlaceHeaderCategories = async ({ countryCode, categories }: PlaceHeaderCategoriesProps) => {
    const locale = await getLocale()
    const country = getCountryByCode(countryCode)

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map(category =>
                country ? (
                    <Link
                        key={`category-${category}`}
                        href={`/countries/${country.slug}?categories=${category}`}
                        className="hover-animated flex h-8 items-center whitespace-nowrap rounded-full border border-blue-100 px-4 text-small text-blue-100 hover:border-blue-active hover:text-blue-active"
                    >
                        {categoriesDictionary.find(item => item.id === category)?.localizedName[locale]}
                    </Link>
                ) : (
                    <div
                        key={`category-${category}`}
                        className="hover-animated flex h-8 items-center whitespace-nowrap rounded-full border border-blue-100 px-4 text-small text-blue-100 hover:border-blue-active hover:text-blue-active"
                    >
                        {categoriesDictionary.find(item => item.id === category)?.localizedName[locale]}
                    </div>
                ),
            )}
        </div>
    )
}
