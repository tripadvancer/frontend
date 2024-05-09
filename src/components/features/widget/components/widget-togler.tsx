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
            params.set(name, value)

            return params.toString()
        },
        [searchParams],
    )

    return (
        <FormButton
            variant={isRandom ? 'blue' : 'orange'}
            icon={isRandom ? <SearchIcon24 /> : <RandomIcon24 />}
            onClick={() => router.push(pathname + '?' + createQueryString('random', isRandom ? 'false' : 'true'))}
        />
    )
}
