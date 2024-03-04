'use client'

import { useCallback } from 'react'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { getSortedCategories } from '@/utils/dictionaries/categories'
import { useI18n } from '@/utils/i18n/i18n.client'

type CountryCategoriesProps = {
    selectedCategoryIds: number[]
    locale: string
}

export const CountryCategories = ({ selectedCategoryIds, locale }: CountryCategoriesProps) => {
    const t = useI18n()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const sortedCategories = getSortedCategories(locale)

    // Create a query string with selected categories
    const createQueryString = useCallback(
        (categoryId: number) => {
            const params = new URLSearchParams(searchParams)

            // Toggle the ID in selectedCategoryIds, for example: /?categories=1,2,3
            const updatedSelectedCategoryIds = selectedCategoryIds.includes(categoryId)
                ? selectedCategoryIds.filter(id => id !== categoryId)
                : [...selectedCategoryIds, categoryId]

            params.set('categories', updatedSelectedCategoryIds.join())
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
            {sortedCategories.map(category => (
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
