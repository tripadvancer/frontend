'use client'

import { useRouter } from 'next/navigation'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const ProtectClientRoute = ({ children, userId }: { children: React.ReactNode; userId?: number }) => {
    const supertokens = useSupertokens()
    const router = useRouter()

    if (!supertokens.isAuth || !supertokens.isMailVerified || (userId && userId !== supertokens.activeUserId)) {
        router.replace('/not_found')
        return null
    }

    return children
}
