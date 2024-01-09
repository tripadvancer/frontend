'use client'

import classNames from 'classnames'

import { categoriesDictionary } from '@/utils/dictionaries/categories'

export const SelectCategories = () => {
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
                            // {
                            //     'bg-blue-active text-blue-20': selectedCategoryIds.includes(category.id),
                            // },
                        )}
                    >
                        {category.localizedName['ru']}
                    </div>
                ))}
            </div>
        </div>
    )
}
