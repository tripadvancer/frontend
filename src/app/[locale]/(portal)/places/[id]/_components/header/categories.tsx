import type { IPlace } from '@/utils/types/place'

import { localizeCategories } from '@/utils/helpers'
import { getScopedI18n } from '@/utils/i18n/i18n.server'

type CategoriesProps = IPlace

export const Categories = async ({ categories }: CategoriesProps) => {
    const tCategories = await getScopedI18n('categories')
    const localizedCategories = localizeCategories(categories, tCategories)

    return (
        <div className="flex gap-2">
            {localizedCategories.map(category => (
                <div
                    key={category.id}
                    className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white"
                >
                    {category.localizedName}
                </div>
            ))}
        </div>
    )
}
