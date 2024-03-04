'use client'

import Supertokens from 'supertokens-web-js'
import Session from 'supertokens-web-js/recipe/session'

import { clientConfig } from './supertokens.client'
import { SupertokensContext, defaultValues } from './supertokens.context'

export const SupertokensProvider = async ({ children }: { children: React.ReactNode }) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const validationErrors = await Session.validateClaims()
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()

        return (
            <SupertokensContext.Provider
                value={{
                    activeUserId: accessTokenPayload.userId,
                    isAuth: doesSessionExist,
                    isMailVerified: validationErrors.length === 0,
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
