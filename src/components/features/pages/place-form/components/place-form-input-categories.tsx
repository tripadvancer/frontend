'use client'

import { PlusIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { SelectCategories } from '@/components/features/dialogs/select-categories/select-categories'
import { useDialog } from '@/providers/dialog-provider'
import { categoriesDictionary } from '@/utils/dictionaries/categories'

type PlaceFormInputCategoriesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

export const PlaceFormInputCategories = ({ value, onChange }: PlaceFormInputCategoriesProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const dialog = useDialog()

    const handleSelectCategories = () => {
        dialog.open(<SelectCategories value={value} onChange={onChange} />)
    }

    return (
        <div className="flex-center flex-wrap gap-2">
            {value.length === 0 && (
                <div
                    className="flex h-8 cursor-pointer items-center gap-x-2 rounded-full border border-white px-4 text-small text-white"
                    onClick={handleSelectCategories}
                >
                    <PlusIcon size={16} />
                    {t('page.placeForm.field.categories.label')}
                </div>
            )}
            {value.map(categoryId => (
                <div
                    key={`category-${categoryId}`}
                    className="flex h-8 cursor-pointer items-center gap-x-2 whitespace-nowrap rounded-full border border-white px-4 text-small text-white"
                    onClick={handleSelectCategories}
                >
                    {categoriesDictionary.find(category => category.id === categoryId)?.localizedName[locale]}
                </div>
            ))}
        </div>
    )
}
