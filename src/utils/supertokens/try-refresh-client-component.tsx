'use client'

import { useEffect } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { GlobalLoading } from '@/components/global-loading'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type TryRefreshComponentProps = {
    fallback?: React.ReactNode
}

export const TryRefreshComponent = ({ fallback }: TryRefreshComponentProps) => {
    const t = useI18n()
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
                toast.error(t('common.error'))
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return fallback ?? <GlobalLoading />
}
