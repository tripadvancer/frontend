'use client'

import { useEffect, useState } from 'react'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ICategory } from '@/types/category'

type CategoryProps = {
    categories: ICategory[]
}

export const Categories = ({ categories }: CategoryProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    // const [selectedCategories, setSelectedCategories] = useState<number[]>([])

    // const handleClick = (id: number) => {
    //     if (params.includes(id)) {
    //         setParams(params.filter(param => param !== id))
    //     } else {
    //         setParams([...params, id])
    //     }
    // }

    // useEffect(() => {
    // console.log(params)
    //     router.push('?category=' + params.join(',') || '', { scroll: false })
    // }, [params, router])

    return categories.map(category => {
        // const params = new URLSearchParams({ category: category.id.toString() })

        return (
            <Link
                key={category.id}
                href={{
                    query: {
                        categories: [searchParams.get('categories')?.split(',') || [], category.id].join(','),
                    },
                }}
                scroll={false}
                className={classNames(
                    'bg-blue-20 text-small hover:bg-blue-active hover-animated hover:text-blue-20 flex h-8 cursor-pointer items-center justify-center rounded-full px-4 text-blue-100',
                    // { 'bg-blue-active': params.includes(category.id) },
                )}
            >
                {category.name}
            </Link>
        )
    })
}
