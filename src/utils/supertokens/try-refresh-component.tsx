'use client'

import { useEffect } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'
import { GlobalLoading } from '@/components/ui/global-loading'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

// Rendered by the server when the access token has expired. A failed refresh clears the session
// cookies, so the refreshed page is rendered for an anonymous user instead of loading forever.
export const TryRefreshComponent = () => {
    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        void waitForSuperTokensInitialization()
            .then(() => Session.attemptRefreshingSession())
            .then(() => router.refresh())
            .catch(() => toast.error(UNEXPECTED_ERROR_MESSAGE))
    }, [router, toast])

    return <GlobalLoading />
}
