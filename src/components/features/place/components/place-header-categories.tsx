import type { IPlace } from '@/utils/types/place'

import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

export const PlaceHeaderCategories = ({ categories }: IPlace) => {
    const locale = getCurrentLocale()

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
