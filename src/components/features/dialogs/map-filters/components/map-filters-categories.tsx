'use client'

import { useLocale, useTranslations } from 'next-intl'

import { getSortedCategories } from '@/utils/dictionaries/categories'

import { MapFiltersCategoriesItem } from './map-filters-categories-item'

type MapFiltersCategoriesProps = {
    selectedCategoriesIds: number[]
    onClick: (selectedCategories: number[]) => void
}

export const MapFiltersCategories = ({ selectedCategoriesIds, onClick }: MapFiltersCategoriesProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const sortedCategories = getSortedCategories(locale)

    const handleSelectCategory = (categoryId: number) => {
        const updatedSelectedCategories = selectedCategoriesIds.includes(categoryId)
            ? selectedCategoriesIds.filter(id => id !== categoryId)
            : [...selectedCategoriesIds, categoryId]

        onClick(updatedSelectedCategories)
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="categories" className="font-medium">
                    Categories
                </label>
                <div className="flex flex-wrap gap-2">
                    <MapFiltersCategoriesItem
                        caption={t('component.categories.all')}
                        isSelected={selectedCategoriesIds.length === 0}
                        onClick={() => onClick([])}
                    />

                    {sortedCategories.map(category => (
                        <MapFiltersCategoriesItem
                            key={`map-filters-categories-item-${category.id}`}
                            caption={category.localizedName[locale]}
                            isSelected={selectedCategoriesIds.includes(category.id)}
                            onClick={() => handleSelectCategory(category.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
