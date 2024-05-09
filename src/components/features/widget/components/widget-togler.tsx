'use client'

import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { RandomIcon24, SearchIcon24 } from '@/components/ui/icons'

export const WidgetTogler = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const isRandom = searchParams.get('random') === 'true'

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())

            if (value === searchParams.get(name)) {
                params.delete(name)
                return params.toString()
            }

            params.set(name, value)
            return params.toString()
        },
        [searchParams],
    )

    const handleClick = () => {
        router.push(pathname + '?' + createQueryString('random', 'true'))
    }

    return (
        <FormButton
            variant={isRandom ? 'blue' : 'orange'}
            icon={isRandom ? <SearchIcon24 /> : <RandomIcon24 />}
            onClick={handleClick}
        />
    )
}
