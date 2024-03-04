'use client'

import { Category } from '@/components/ui/category'
import { getSortedCategories } from '@/utils/dictionaries/categories'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

type CategoryProps = {
    variant: 'blue' | 'orange'
    selectedCategories: number[]
    onClick: (selectedCategories: number[]) => void
}

export const Categories = ({ variant, selectedCategories, onClick }: CategoryProps) => {
    const t = useI18n()
    const currentLocale = useCurrentLocale()
    const sortedCategories = getSortedCategories(currentLocale)

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
                {t('categories.all')}
            </Category>

            {sortedCategories.map(category => (
                <Category
                    key={category.id}
                    variant={variant}
                    isSelected={selectedCategories.includes(category.id)}
                    onClick={() => handleSelectCategory(category.id)}
                >
                    {category.localizedName[currentLocale]}
                </Category>
            ))}
        </div>
    )
}
