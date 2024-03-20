'use client'

import { useRouter } from 'next/navigation'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

type ProtectClientRouteProps = {
    children: React.ReactNode
    userId?: number
    isVerifiedRequired?: boolean
}

export const ProtectClientRoute = ({ children, userId, isVerifiedRequired }: ProtectClientRouteProps) => {
    const supertokens = useSupertokens()
    const router = useRouter()

    if (
        !supertokens.isAuth ||
        (isVerifiedRequired && !supertokens.isMailVerified) ||
        (userId && userId !== supertokens.activeUserId)
    ) {
        router.replace('/not_found')
        return null
    }

    return children
}
