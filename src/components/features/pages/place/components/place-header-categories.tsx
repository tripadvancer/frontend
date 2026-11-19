import Link from 'next/link'

import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { getCountryByCode } from '@/utils/helpers/countries'

type PlaceHeaderCategoriesProps = {
    countryCode: string | null
    categories: number[]
}

export const PlaceHeaderCategories = async ({ countryCode, categories }: PlaceHeaderCategoriesProps) => {
    const country = getCountryByCode(countryCode)

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map(category =>
                country ? (
                    <Link
                        key={`category-${category}`}
                        href={`/${country.slug}?categories=${category}`}
                        className="hover-animated text-small hover:border-blue-active hover:text-blue-active flex h-8 items-center rounded-full border border-blue-100 px-4 whitespace-nowrap text-blue-100"
                    >
                        {categoriesDictionary.find(item => item.id === category)?.name}
                    </Link>
                ) : (
                    <div
                        key={`category-${category}`}
                        className="hover-animated text-small hover:border-blue-active hover:text-blue-active flex h-8 items-center rounded-full border border-blue-100 px-4 whitespace-nowrap text-blue-100"
                    >
                        {categoriesDictionary.find(item => item.id === category)?.name}
                    </div>
                ),
            )}
        </div>
    )
}
