'use client'

import classNames from 'classnames'
import { PlusIcon } from 'lucide-react'

import { SelectCategories } from '@/components/features/dialogs/select-categories/select-categories'
import { useDialog } from '@/components/providers/dialog-provider'
import { categoriesDictionary } from '@/utils/dictionaries/categories'

type PlaceFormInputCategoriesProps = {
    value: number[]
    error?: string | string[]
    onChange: (value: number[]) => void
}

export const PlaceFormInputCategories = ({ value, error, onChange }: PlaceFormInputCategoriesProps) => {
    const dialog = useDialog()

    const handleSelectCategories = () => {
        dialog.open(<SelectCategories value={value} onChange={onChange} />)
    }

    return (
        <div className="flex flex-wrap gap-2">
            {value.length === 0 && (
                <div
                    className={classNames(
                        'hover-animated bg-blue-20 text-small hover:text-blue-active flex h-8 cursor-pointer items-center gap-x-2 rounded-full px-4 text-blue-100',
                        { 'bg-red-20 text-red-100': error },
                    )}
                    onClick={handleSelectCategories}
                >
                    <PlusIcon size={16} />
                    Add category
                </div>
            )}
            {value.map(categoryId => (
                <div
                    key={`category-${categoryId}`}
                    className="hover-animated text-small hover:border-blue-active hover:text-blue-active flex h-8 cursor-pointer items-center gap-x-2 rounded-full border border-blue-100 px-4 whitespace-nowrap text-blue-100"
                    onClick={handleSelectCategories}
                >
                    {categoriesDictionary.find(category => category.id === categoryId)?.name}
                </div>
            ))}
        </div>
    )
}
