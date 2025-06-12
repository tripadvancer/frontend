'use client'

import { useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { getSortedCategories } from '@/utils/dictionaries/categories'
import { updateSelectedCategories } from '@/utils/helpers/common'

import { SelectCategoriesItem } from './select-categories-item'

type SelectCategoriesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

const maxCategoriesCount = validationConfig.place.category.maxCount

export const SelectCategories = ({ value, onChange }: SelectCategoriesProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const dialog = useDialog()
    const sortedCategories = getSortedCategories(locale)

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
        <div className="space-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('dialog.selectCategories.title', { maxCount: maxCategoriesCount })}</h1>
            <div className="flex flex-wrap justify-center gap-1">
                {sortedCategories.map(category => (
                    <SelectCategoriesItem
                        key={`category-${category.id}`}
                        id={category.id}
                        localizedName={category.localizedName[locale]}
                        isSelected={selectedCategoryIds.includes(category.id)}
                        isDisabled={
                            selectedCategoryIds.length === maxCategoriesCount &&
                            !selectedCategoryIds.includes(category.id)
                        }
                        onClick={handleCategoryClick}
                    />
                ))}
            </div>
            <div className="space-y-4">
                <FormButton className="w-full" isDisabled={selectedCategoryIds.length === 0} onClick={handleConfirm}>
                    {t('common.action.confirm')}
                </FormButton>
                <div className="text-center text-small text-black-40">
                    {t.rich('dialog.selectCategories.help', {
                        br: () => <br />,
                        helpLink: helpLink => (
                            <Link href="https://help.tripadvancer.com/categories" target="_blank">
                                {helpLink}
                            </Link>
                        ),
                    })}
                </div>
            </div>
        </div>
    )
}
