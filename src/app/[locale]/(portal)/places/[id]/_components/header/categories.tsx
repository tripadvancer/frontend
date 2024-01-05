import type { IPlace } from '@/utils/types/place'

import { categoriesDictionary } from '@/utils/dictionaries/categories'

type CategoriesProps = IPlace & {
    locale: string
}

export const Categories = async ({ categories, locale }: CategoriesProps) => {
    return (
        <div className="flex gap-2">
            {categories.map(category => (
                <div
                    key={category.id}
                    className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white"
                >
                    {categoriesDictionary[category.id].localizedName[locale]}
                </div>
            ))}
        </div>
    )
}
