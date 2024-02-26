'use client'

import Session from 'supertokens-web-js/recipe/session'

import { EmailVerificationNotice } from './email-verification-notice'

export const EmailVerification = async () => {
    if (await Session.doesSessionExist()) {
        const validationErrors = await Session.validateClaims()
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()

        if (validationErrors.length > 0) {
            return <EmailVerificationNotice userId={accessTokenPayload.userId} />
        }
    }

    return null
}
