'use client'

import { useState } from 'react'

import classNames from 'classnames'

import { FormButtonStroke } from '@/components/ui/form-button-stroke'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { useI18n } from '@/utils/i18n/i18n.client'

const maxCategoriesCount = validationConfig.place.category.maxCount

type FormSelectCategoriesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

export const FormSelectCategories = ({ value, onChange }: FormSelectCategoriesProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(value)

    const handleCategoryClick = (categoryId: number) => {
        const updatedSelectedCategoryIds = selectedCategoryIds.includes(categoryId)
            ? selectedCategoryIds.filter(id => id !== categoryId)
            : [...selectedCategoryIds, categoryId]
        setSelectedCategoryIds(updatedSelectedCategoryIds)
    }

    const handleChange = () => {
        onChange(selectedCategoryIds)
        dialog.close()
    }

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="text-center text-h7">Select up to 3 categories</h1>
            <div className="flex flex-wrap justify-center gap-1">
                {categoriesDictionary.map(category => (
                    <div
                        key={category.id}
                        className={classNames(
                            'hover-animated flex-center h-8 cursor-pointer rounded-full bg-blue-20 px-4 text-small text-blue-100 sm:hover:bg-blue-active sm:hover:text-blue-20',
                            {
                                'bg-blue-active text-blue-20': selectedCategoryIds.includes(category.id),
                                'pointer-events-none opacity-30':
                                    selectedCategoryIds.length === maxCategoriesCount &&
                                    !selectedCategoryIds.includes(category.id),
                            },
                        )}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.localizedName['ru']}
                    </div>
                ))}
            </div>
            <FormButtonStroke onClick={handleChange}>{t('common.action.confirm')}</FormButtonStroke>
        </div>
    )
}
