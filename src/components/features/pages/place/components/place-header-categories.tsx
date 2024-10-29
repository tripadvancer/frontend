import { getLocale } from 'next-intl/server'

import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { IPlace } from '@/utils/types/place'

export const PlaceHeaderCategories = async ({ categories }: IPlace) => {
    const locale = await getLocale()

    return (
        <div className="flex-center flex-wrap gap-2">
            {categories.map(category => (
                <div
                    key={`category-${category}`}
                    className="flex h-8 items-center whitespace-nowrap rounded-full border border-white px-4 text-small text-white"
                >
                    {categoriesDictionary.find(item => item.id === category)?.localizedName[locale]}
                </div>
            ))}
        </div>
    )
}
