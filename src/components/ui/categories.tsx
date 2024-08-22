'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Category } from '@/components/ui/category'
import { getSortedCategories } from '@/utils/dictionaries/categories'

type CategoryProps = {
    variant: 'blue' | 'orange'
    selectedCategories: number[]
    onClick: (selectedCategories: number[]) => void
}

export const Categories = ({ variant, selectedCategories, onClick }: CategoryProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const sortedCategories = getSortedCategories(locale)

    const handleSelectCategory = (categoryId: number) => {
        const updatedSelectedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId]

        onClick(updatedSelectedCategories)
    }

    const handleResetCategories = () => {
        onClick([])
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Category variant={variant} isSelected={selectedCategories.length === 0} onClick={handleResetCategories}>
                {t('component.categories.all')}
            </Category>

            {sortedCategories.map(category => (
                <Category
                    key={`category-${category.id}`}
                    variant={variant}
                    isSelected={selectedCategories.includes(category.id)}
                    onClick={() => handleSelectCategory(category.id)}
                >
                    {category.localizedName[locale]}
                </Category>
            ))}
        </div>
    )
}
