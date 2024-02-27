'use client'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

export const ProtectClientRoute = async ({ component, userId }: { component: React.ReactNode; userId?: number }) => {
    const router = useRouter()

    const doesSessionExist = await Session.doesSessionExist()
    if (!doesSessionExist) {
        router.replace('/not_found')
        return null
    }

    const validationErrors = await Session.validateClaims()
    if (validationErrors.length > 0) {
        router.replace('/not_found')
        return null
    }

    return <>{component}</>
}
