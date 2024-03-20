'use client'

import Supertokens from 'supertokens-web-js'
import { EmailVerificationClaim } from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'

import { clientConfig } from './supertokens.client'
import { SupertokensContext, defaultValues } from './supertokens.context'

export const SupertokensProvider = async ({ children }: { children: React.ReactNode }) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const isMailVerified = await Session.getClaimValue({ claim: EmailVerificationClaim })
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()

        return (
            <SupertokensContext.Provider
                value={{
                    activeUserId: accessTokenPayload.userId,
                    isAuth: doesSessionExist,
                    isMailVerified: !!isMailVerified,
                }}
            >
                {children}
            </SupertokensContext.Provider>
        )
    }

    return <SupertokensContext.Provider value={defaultValues}>{children}</SupertokensContext.Provider>
}

if (typeof window !== 'undefined') {
    Supertokens.init(clientConfig())
}
