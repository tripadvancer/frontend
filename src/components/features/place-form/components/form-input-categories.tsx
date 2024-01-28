'use client'

import { useDialog } from '@/providers/dialog-provider'
import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

import { FormSelectCategories } from './form-select-categories'

type FormInputCoordinatesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

export const FormInputCategories = ({ value, onChange }: FormInputCoordinatesProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const currentLocale = useCurrentLocale()

    const handleSelectCategories = () => {
        dialog.open(<FormSelectCategories value={value} onChange={onChange} />)
    }

    return (
        <div className="flex gap-2">
            {value.length === 0 && (
                <div
                    className="hover-animated flex h-8 cursor-pointer items-center gap-x-2 rounded-full border border-white px-4 text-small text-white hover:border-blue-active hover:text-blue-active"
                    onClick={handleSelectCategories}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.01005 8.98995H2L2 7.01005H7.01005V2H8.98995V7.01005H14L14 8.98995H8.98995V14H7.01005V8.98995Z"
                        />
                    </svg>
                    {t('pages.add_place.categories.add_category.button')}
                </div>
            )}
            {value.map(categoryId => (
                <div
                    key={categoryId}
                    className="hover-animated flex h-8 cursor-pointer items-center gap-x-2 rounded-full border border-white px-4 text-small text-white hover:border-blue-active hover:text-blue-active"
                    onClick={handleSelectCategories}
                >
                    {categoriesDictionary.find(category => category.id === categoryId)?.localizedName[currentLocale]}
                </div>
            ))}
        </div>
    )
}
