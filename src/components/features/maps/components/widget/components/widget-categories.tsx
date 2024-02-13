'use client'

import { IconChevron } from '@/components/ui/icon-chevron'
import {
    getWidgetCategoriesVisibility,
    getWidgetSelectedCategories,
    resetWidgetSelectedCategories,
    setWidgetSelectedCategories,
    toggleWidgetCategoriesVisibility,
} from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getSortedCategories } from '@/utils/dictionaries/categories'
import { useCurrentLocale } from '@/utils/i18n/i18n.client'

import { WidgetCategory } from './widget-category'

export const WidgetCategories = () => {
    const dispatch = useAppDispatch()
    const currentLocale = useCurrentLocale()
    const isCategoriesVisible = useAppSelector(getWidgetCategoriesVisibility)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)
    const sortedCategories = getSortedCategories(currentLocale)

    const toggleVisibility = () => {
        dispatch(toggleWidgetCategoriesVisibility())
    }

    const resetCategories = () => {
        dispatch(resetWidgetSelectedCategories())
    }

    return (
        <div className="flex flex-col gap-y-4 rounded-2xl bg-blue-10 p-4 sm:p-8">
            <div className="flex cursor-pointer items-center justify-between" onClick={toggleVisibility}>
                <div className="text-caps uppercase">Categories</div>
                <div className="flex items-center justify-center gap-2">
                    {selectedCategories.length > 0 && (
                        <div className="text-small text-blue-100">{`${selectedCategories.length} selected`}</div>
                    )}
                    <IconChevron position={isCategoriesVisible ? 'down' : 'up'} />
                </div>
            </div>

            {isCategoriesVisible && (
                <div className="flex flex-wrap gap-2">
                    <WidgetCategory
                        name="All categories"
                        isSelected={selectedCategories.length === 0}
                        onClick={resetCategories}
                    />

                    {sortedCategories.map(category => (
                        <WidgetCategory
                            key={category.id}
                            name={category.localizedName[currentLocale]}
                            isSelected={selectedCategories.includes(category.id)}
                            onClick={() => dispatch(setWidgetSelectedCategories(category.id))}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
