'use client'

import { useCallback } from 'react'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { ICategory } from '@/types/category'

// import { useScopedI18n } from '@/utils/i18n.client'

type CategoryProps = {
    categories: ICategory[]
    selectedCategoryIds: number[]
}

export const Categories = ({ categories, selectedCategoryIds }: CategoryProps) => {
    // const tCategories = useScopedI18n('categories')
    const router = useRouter()
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
        <>
            <div
                className={classNames(
                    'hover-animated flex h-8 cursor-pointer items-center justify-center rounded-full bg-blue-20 px-4 text-small text-blue-100 hover:bg-blue-active hover:text-blue-20',
                    {
                        'bg-blue-active text-blue-20': selectedCategoryIds.length === 0,
                    },
                )}
                onClick={() => router.push(pathname, { scroll: false })}
            >
                {/* {tCategories('all')} */}
                All categories
            </div>
            {categories.map(category => (
                <Link
                    key={category.id}
                    href={{ query: createQueryString(category.id) }}
                    scroll={false}
                    className={classNames(
                        'hover-animated flex h-8 cursor-pointer items-center justify-center rounded-full bg-blue-20 px-4 text-small text-blue-100 hover:bg-blue-active hover:text-blue-20',
                        {
                            'bg-blue-active text-blue-20': selectedCategoryIds.includes(category.id),
                        },
                    )}
                >
                    {category.localizedName}
                </Link>
            ))}
        </>
    )
}
