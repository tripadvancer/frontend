'use client'

import classNames from 'classnames'
import { PlusIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { SelectCategories } from '@/components/features/dialogs/select-categories/select-categories'
import { useDialog } from '@/providers/dialog-provider'
import { categoriesDictionary } from '@/utils/dictionaries/categories'

type PlaceFormInputCategoriesProps = {
    value: number[]
    error?: string | string[]
    onChange: (value: number[]) => void
}

export const PlaceFormInputCategories = ({ value, error, onChange }: PlaceFormInputCategoriesProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const dialog = useDialog()

    const handleSelectCategories = () => {
        dialog.open(<SelectCategories value={value} onChange={onChange} />)
    }

    return (
        <div className="flex flex-wrap gap-2">
            {value.length === 0 && (
                <div
                    className={classNames(
                        'hover-animated flex h-8 cursor-pointer items-center gap-x-2 rounded-full bg-blue-20 px-4 text-small text-blue-100 hover:text-blue-active',
                        { 'bg-red-20 text-red-100': error },
                    )}
                    onClick={handleSelectCategories}
                >
                    <PlusIcon size={16} />
                    {t('page.placeForm.field.categories.label')}
                </div>
            )}
            {value.map(categoryId => (
                <div
                    key={`category-${categoryId}`}
                    className="hover-animated flex h-8 cursor-pointer items-center gap-x-2 whitespace-nowrap rounded-full border border-blue-100 px-4 text-small text-blue-100 hover:border-blue-active hover:text-blue-active"
                    onClick={handleSelectCategories}
                >
                    {categoriesDictionary.find(category => category.id === categoryId)?.localizedName[locale]}
                </div>
            ))}
        </div>
    )
}
