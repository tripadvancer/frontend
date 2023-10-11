import { useMemo } from 'react'

import type { AuthUserResponse } from '@/types/auth'

import { getCurrentUser, getIsAuth } from '@/redux/features/userSlice'
import { useAppSelector } from '@/redux/hooks'
import { UserRoles } from '@/utils/enums'

interface AuthInterface {
    user: AuthUserResponse | null
    isAuth: boolean
    isMe: boolean
    isAdmin: boolean
}

export function useAuth(userId: number | null = null): AuthInterface {
    const user = useAppSelector(getCurrentUser)
    const isAuth = useAppSelector(getIsAuth)

    const isMe = user?.id === userId
    const isAdmin = !!user && user.role === UserRoles.ADMIN

    return useMemo(() => ({ user, isAuth, isMe, isAdmin }), [user, isAuth, isMe, isAdmin])
}
