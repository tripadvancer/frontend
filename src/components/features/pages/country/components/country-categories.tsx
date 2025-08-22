'use client'

import { useCallback } from 'react'

import { useTranslations } from 'next-intl'

import { usePathname, useSearchParams } from 'next/navigation'

import { getSortedCategories } from '@/utils/dictionaries/categories'

import { CountryCategoriesItem } from './country-categories-item'

type CountryCategoriesProps = {
    selectedCategoryIds: number[]
    locale: string
}

export const CountryCategories = ({ selectedCategoryIds, locale }: CountryCategoriesProps) => {
    const t = useTranslations()
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
        <div className="flex flex-wrap gap-1">
            <CountryCategoriesItem
                href={pathname}
                caption={t('component.categories.all')}
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
