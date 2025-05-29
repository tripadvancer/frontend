'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export const UserRedirect = ({ username }: { username: string }) => {
    const router = useRouter()

    useEffect(() => {
        router.replace(`/users/${username.toLowerCase()}/places`, {
            scroll: false,
        })
    }, [username, router])

    return null
}
