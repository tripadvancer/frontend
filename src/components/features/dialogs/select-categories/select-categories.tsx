'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'
import { validationConfig } from '@/configs/validation.config'
import { getSortedCategories } from '@/utils/dictionaries/categories'
import { updateSelectedCategories } from '@/utils/helpers/common'

import { SelectCategoriesItem } from './select-categories-item'

type SelectCategoriesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

const maxCategoriesCount = validationConfig.place.category.maxCount

export const SelectCategories = ({ value, onChange }: SelectCategoriesProps) => {
    const dialog = useDialog()
    const sortedCategories = getSortedCategories()

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
            <div className="flex flex-col gap-y-4">
                <FormButton isDisabled={selectedCategoryIds.length === 0} onClick={handleConfirm}>
                    {'Confirm'}
                </FormButton>
                <div className="text-center text-small text-black-40">
                    {
                        <>
                            Not sure which categories to choose?
                            <br />
                            Take a look at our{' '}
                            {
                                <Link href="https://help.tripadvancer.com/categories" target="_blank">
                                    category descriptions
                                </Link>
                            }{' '}
                            to choose the right ones.
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
