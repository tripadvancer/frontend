'use client'

import { useEffect } from 'react'

import classNames from 'classnames'

import { userAgentFromString } from 'next/server'

import { FormButton } from '@/components/ui/form-button'
import { FormButtonStroke } from '@/components/ui/form-button-stroke'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { useI18n } from '@/utils/i18n/i18n.client'

const maxCategoriesCount = validationConfig.place.category.maxCount

type FormSelectCategoriesProps = {
    selectedCategoryIds: number[]
    setSelectedCategoryIds: (value: number[]) => void
}

export const FormSelectCategories = ({ selectedCategoryIds, setSelectedCategoryIds }: FormSelectCategoriesProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const categoryIsSelected = (categoryId: number) => selectedCategoryIds.includes(categoryId)

    const handleCategoryClick = (categoryId: number) => {
        const updatedSelectedCategoryIds = categoryIsSelected(categoryId)
            ? selectedCategoryIds.filter(id => id !== categoryId)
            : [...selectedCategoryIds, categoryId]

        setSelectedCategoryIds(updatedSelectedCategoryIds)
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="text-h7">Select categories</h1>
            <hr className="border-black-70" />
            You can select up to 3 categories
            <div className="flex flex-wrap justify-center gap-1">
                {categoriesDictionary.map(category => (
                    <div
                        key={category.id}
                        className={classNames(
                            'hover-animated flex-center h-8 cursor-pointer rounded-full bg-blue-20 px-4 text-small text-blue-100 sm:hover:bg-blue-active sm:hover:text-blue-20',
                            {
                                'bg-blue-active text-blue-20': categoryIsSelected(category.id),
                                'pointer-events-none opacity-50':
                                    !categoryIsSelected(category.id) &&
                                    selectedCategoryIds.length === maxCategoriesCount,
                            },
                        )}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.localizedName['ru']}
                    </div>
                ))}
            </div>
            <div className="flex gap-x-2">
                <FormButton type="submit">{t('common.action.send')}</FormButton>
                <FormButtonStroke onClick={() => dialog.close()}>{t('common.action.cancel')}</FormButtonStroke>
            </div>
        </div>
    )
}
