'use client'

import { getSelectedCategories, resetSelectedCategories, setSelectedCategories } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { useCurrentLocale } from '@/utils/i18n/i18n.client'

import { Category } from './category'

export const Categories = () => {
    const currentLocale = useCurrentLocale()
    const selectedCategories = useAppSelector(getSelectedCategories)
    const dispatch = useAppDispatch()

    return (
        <div className="flex cursor-pointer flex-wrap gap-2 text-small">
            <Category
                name="All categories"
                isSelected={selectedCategories.length === 0}
                onClick={() => dispatch(resetSelectedCategories())}
            />

            {categoriesDictionary.map(category => (
                <Category
                    key={category.id}
                    name={category.localizedName[currentLocale]}
                    isSelected={selectedCategories.includes(category.id)}
                    onClick={() => dispatch(setSelectedCategories(category.id))}
                />
            ))}
        </div>
    )
}
