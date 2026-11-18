'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { FormButton } from '@/components/ui/form-button'
import { getSortedCategories } from '@/utils/dictionaries/categories'
import { updateSelectedCategories } from '@/utils/helpers/common'

import { SelectCategoriesItem } from './select-categories-item'

type SelectCategoriesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

export const SelectCategories = ({ value, onChange }: SelectCategoriesProps) => {
    const settings = useAppSettings()
    const dialog = useDialog()
    const sortedCategories = getSortedCategories()
    const maxCategoriesCount = settings?.validation.place.category.maxCount ?? 0

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(value)

    const handleCategoryClick = (categoryId: number) => {
        const updatedSelectedCategoryIds = updateSelectedCategories(selectedCategoryIds, categoryId)
        setSelectedCategoryIds(updatedSelectedCategoryIds)
    }

    const handleConfirm = () => {
        onChange(selectedCategoryIds)
        dialog.close()
    }

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{`Select up to ${maxCategoriesCount} categories`}</h1>
            <div className="flex flex-wrap justify-center gap-1">
                {sortedCategories.map(category => (
                    <SelectCategoriesItem
                        key={`category-${category.id}`}
                        id={category.id}
                        name={category.name}
                        isSelected={selectedCategoryIds.includes(category.id)}
                        isDisabled={
                            selectedCategoryIds.length === maxCategoriesCount &&
                            !selectedCategoryIds.includes(category.id)
                        }
                        onClick={handleCategoryClick}
                    />
                ))}
            </div>
            <FormButton isDisabled={selectedCategoryIds.length === 0} onClick={handleConfirm}>
                Confirm
            </FormButton>
        </div>
    )
}
