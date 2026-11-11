'use client'

import { Category } from '@/components/ui/category'
import { getSortedCategories } from '@/utils/dictionaries/categories'

type CategoryProps = {
    variant: 'blue' | 'orange'
    selectedCategories: number[]
    onClick: (selectedCategories: number[]) => void
}

export const Categories = ({ variant, selectedCategories, onClick }: CategoryProps) => {
    const sortedCategories = getSortedCategories()

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
                {'All'}
            </Category>

            {sortedCategories.map(category => (
                <Category
                    key={`category-${category.id}`}
                    variant={variant}
                    isSelected={selectedCategories.includes(category.id)}
                    onClick={() => handleSelectCategory(category.id)}
                >
                    {category.name}
                </Category>
            ))}
        </div>
    )
}
