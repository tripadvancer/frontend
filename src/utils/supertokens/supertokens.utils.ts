import { getSSRSession } from 'supertokens-node/nextjs'
import { SessionContainer } from 'supertokens-node/recipe/session'

import { cookies, headers } from 'next/headers'

import { ensureSuperTokensInit } from './supertokens.server'

ensureSuperTokensInit()

type SSRSession = {
    session: SessionContainer | undefined
    hasToken: boolean
}

// hasToken without a session means the access token has expired and must be refreshed on the client
export async function getSSRSessionHelper(): Promise<SSRSession> {
    const [cookieStore, headersList] = await Promise.all([cookies(), headers()])

    try {
        return await getSSRSession(cookieStore.getAll(), headersList)
    } catch {
        return { session: undefined, hasToken: false }
    }
}
