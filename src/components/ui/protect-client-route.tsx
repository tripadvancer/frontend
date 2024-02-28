'use client'

import { useRouter } from 'next/navigation'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const ProtectClientRoute = ({ component }: { component: React.ReactNode }) => {
    const supertokens = useSupertokens()
    const router = useRouter()

    if (!supertokens.isAuth || !supertokens.isMailVerified) {
        router.replace('/not_found')
        return null
    }

    return component
}
