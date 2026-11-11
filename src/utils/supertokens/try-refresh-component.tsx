'use client'

import { ReactNode, useEffect } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'
import { GlobalLoading } from '@/components/ui/global-loading'

type TryRefreshComponentProps = {
    fallback?: ReactNode
}

export const TryRefreshComponent = ({ fallback }: TryRefreshComponentProps) => {
    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        void Session.attemptRefreshingSession()
            .then(hasSession => {
                if (hasSession) {
                    router.refresh()
                }
            })
            .catch(() => {
                toast.error('An unexpected error has occurred. Please try again later.')
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return fallback ?? <GlobalLoading />
}
