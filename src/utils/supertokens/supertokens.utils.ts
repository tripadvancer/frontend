import { getSSRSession } from 'supertokens-node/nextjs'
import { SessionContainer } from 'supertokens-node/recipe/session'

import { cookies, headers } from 'next/headers'

import { ensureSuperTokensInit } from './supertokens.server'

ensureSuperTokensInit()

export async function getSSRSessionHelper(): Promise<{
    session: SessionContainer | undefined
    hasToken: boolean
    hasInvalidClaims: boolean
    error: Error | undefined
}> {
    let session: SessionContainer | undefined
    let hasToken = false
    let hasInvalidClaims = false
    let error: Error | undefined = undefined

    const cookieStore = await cookies()
    const headersList = await headers()

    try {
        ;({ session, hasToken, hasInvalidClaims } = await getSSRSession(cookieStore.getAll(), headersList))
    } catch (err: any) {
        error = err
    }

    return { session, hasToken, hasInvalidClaims, error }
}
