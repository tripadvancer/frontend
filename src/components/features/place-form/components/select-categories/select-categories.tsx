'use client'

import { useState } from 'react'

import { FormButton } from '@/components/ui/form-button'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { getSortedCategories } from '@/utils/dictionaries/categories'
import { updateSelectedCategories } from '@/utils/helpers/common'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

import { SelectCategoriesCategory } from './select-categories-category'

type SelectCategoriesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

const maxCategoriesCount = validationConfig.place.category.maxCount

export const SelectCategories = ({ value, onChange }: SelectCategoriesProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const currentLocale = useCurrentLocale()
    const sortedCategories = getSortedCategories(currentLocale)

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
            <h1 className="h7 text-center">{t('select_categories.title', { max_count: maxCategoriesCount })}</h1>
            <div className="flex flex-wrap justify-center gap-1">
                {sortedCategories.map(category => (
                    <SelectCategoriesCategory
                        key={`category-${category.id}`}
                        id={category.id}
                        localizedName={category.localizedName[currentLocale]}
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
                {t('common.action.confirm')}
            </FormButton>
        </div>
    )
}
