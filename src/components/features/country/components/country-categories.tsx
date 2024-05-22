'use client'

import { useCallback } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import { getSortedCategories } from '@/utils/dictionaries/categories'
import { useI18n } from '@/utils/i18n/i18n.client'

import { CountryCategoriesItem } from './country-categories-item'

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
        <div className="mx-auto flex flex-wrap justify-center gap-1 md:w-3/4 lg:w-2/3">
            <CountryCategoriesItem
                href={pathname}
                caption={t('categories.all')}
                isSelected={selectedCategoryIds.length === 0}
            />

            {sortedCategories.map(category => (
                <CountryCategoriesItem
                    key={`category-${category.id}`}
                    href={{ query: createQueryString(category.id) }}
                    caption={category.localizedName[locale]}
                    isSelected={selectedCategoryIds.includes(category.id)}
                />
            ))}
        </div>
    )
}
