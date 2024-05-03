'use client'

import { PlusIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

import { SelectCategories } from './select-categories/select-categories'

type PlaceFormInputCategoriesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

export const PlaceFormInputCategories = ({ value, onChange }: PlaceFormInputCategoriesProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const currentLocale = useCurrentLocale()

    const handleSelectCategories = () => {
        dialog.open(<SelectCategories value={value} onChange={onChange} />)
    }

    return (
        <div className="flex-center flex-wrap gap-2">
            {value.length === 0 && (
                <div
                    className="hover-animated flex h-8 cursor-pointer items-center gap-x-2 rounded-full border border-white px-4 text-small text-white hover:border-blue-active hover:text-blue-active"
                    onClick={handleSelectCategories}
                >
                    <PlusIcon16 />
                    {t('pages.add_place.add_category')}
                </div>
            )}
            {value.map(categoryId => (
                <div
                    key={`category-${categoryId}`}
                    className="hover-animated flex h-8 cursor-pointer items-center gap-x-2 whitespace-nowrap rounded-full border border-white px-4 text-small text-white hover:border-blue-active hover:text-blue-active"
                    onClick={handleSelectCategories}
                >
                    {categoriesDictionary.find(category => category.id === categoryId)?.localizedName[currentLocale]}
                </div>
            ))}
        </div>
    )
}
