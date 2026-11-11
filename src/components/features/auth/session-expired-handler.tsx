'use client'

import { useEffect } from 'react'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { SESSION_EXPIRED_EVENT } from '@/utils/constants'

export const SessionExpiredHandler = () => {
    const { open } = useDialog()

    useEffect(() => {
        const handleSessionExpired = () => open(<SignIn />)

        window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)

        return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)
    }, [open])

    return null
}
