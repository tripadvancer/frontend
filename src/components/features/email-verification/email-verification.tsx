'use client'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { EmailVerificationNotice } from './email-verification-notice'

export const EmailVerification = () => {
    const supertokens = useSupertokens()

    if (supertokens.isAuth && !supertokens.isMailVerified) {
        return <EmailVerificationNotice userId={supertokens.activeUserId as number} />
    }

    return null
}
