'use client'

import { useCallback } from 'react'

import classNames from 'classnames'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { ICategory } from '@/types/category'

type CategoryProps = {
    categories: ICategory[]
    selectedCategories: number[]
}

export const Categories = ({ categories, selectedCategories }: CategoryProps) => {
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (id: number) => {
            const params = new URLSearchParams(searchParams)

            // Toggle the ID in selectedCategories, for example: /?categories=1,2,3
            const updatedCategories = selectedCategories.includes(id)
                ? selectedCategories.filter(item => item !== id)
                : [...selectedCategories, id]

            // Remove elements equal to 0, for example: /?categories=
            const updatedCategoriesWithoutZero = updatedCategories.filter(item => item !== 0)

            params.set('categories', updatedCategoriesWithoutZero.join())
            return params.toString()
        },
        [searchParams, selectedCategories],
    )

    return categories.map(category => (
        <Link
            key={category.id}
            href={{ query: createQueryString(category.id) }}
            scroll={false}
            className={classNames(
                'hover-animated flex h-8 cursor-pointer items-center justify-center rounded-full bg-blue-20 px-4 text-small text-blue-100 hover:bg-blue-active hover:text-blue-20',
                {
                    'bg-blue-active text-blue-20': selectedCategories.includes(category.id),
                },
            )}
        >
            {category.name}
        </Link>
    ))
}
