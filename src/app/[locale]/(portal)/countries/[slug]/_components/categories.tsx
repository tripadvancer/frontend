'use client'

import { useCallback } from 'react'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { useI18n } from '@/utils/i18n/i18n.client'

type CategoryProps = {
    selectedCategoryIds: number[]
    locale: string
}

export const Categories = ({ selectedCategoryIds, locale }: CategoryProps) => {
    const t = useI18n()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Create a query string with selected categories
    const createQueryString = useCallback(
        (id: number) => {
            const params = new URLSearchParams(searchParams)

            // Toggle the ID in selectedCategoryIds, for example: /?categories=1,2,3
            const updatedCategories = selectedCategoryIds.includes(id)
                ? selectedCategoryIds.filter(item => item !== id)
                : [...selectedCategoryIds, id]

            params.set('categories', updatedCategories.join())
            return params.toString()
        },
        [searchParams, selectedCategoryIds],
    )

    return (
        <div className="mx-auto flex flex-wrap justify-center gap-1 sm:w-2/3">
            <Link
                href={pathname}
                scroll={false}
                replace={true}
                className={classNames(
                    'hover-animated flex-center h-8 cursor-pointer rounded-full bg-blue-20 px-4 text-small text-blue-100 hover:bg-blue-active hover:text-blue-20',
                    {
                        'bg-blue-active text-blue-20': selectedCategoryIds.length === 0,
                    },
                )}
            >
                {t('categories.all')}
            </Link>
            {categoriesDictionary.map(category => (
                <Link
                    key={category.id}
                    href={{ query: createQueryString(category.id) }}
                    scroll={false}
                    replace={true}
                    className={classNames(
                        'hover-animated flex-center h-8 cursor-pointer rounded-full bg-blue-20 px-4 text-small text-blue-100 sm:hover:bg-blue-active sm:hover:text-blue-20',
                        {
                            'bg-blue-active text-blue-20': selectedCategoryIds.includes(category.id),
                        },
                    )}
                >
                    {category.localizedName[locale]}
                </Link>
            ))}
        </div>
    )
}
