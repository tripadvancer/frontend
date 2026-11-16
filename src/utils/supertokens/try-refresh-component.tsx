'use client'

import { ReactNode, useEffect } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { GlobalLoading } from '@/components/ui/global-loading'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.init'

type TryRefreshComponentProps = {
    fallback?: ReactNode
}

export const TryRefreshComponent = ({ fallback }: TryRefreshComponentProps) => {
    const settings = useAppSettings()
    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        if (settings) {
            void waitForSuperTokensInitialization()
                .then(() => Session.attemptRefreshingSession())
                .then(hasSession => {
                    if (hasSession) {
                        router.refresh()
                    }
                })
                .catch(() => {
                    toast.error('An unexpected error has occurred. Please try again later.')
                })
        }
    }, [router, settings, toast])

    return fallback ?? <GlobalLoading />
}
