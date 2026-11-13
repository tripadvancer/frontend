import { getSSRSession } from 'supertokens-node/nextjs'
import { SessionContainer } from 'supertokens-node/recipe/session'

import { cookies, headers } from 'next/headers'

import { ensureSuperTokensInit } from './supertokens.server'

ensureSuperTokensInit()

export async function getSSRSessionHelper(): Promise<{
    session: SessionContainer | undefined
    hasToken: boolean
}> {
    let session: SessionContainer | undefined
    let hasToken = false

    const cookieStore = await cookies()
    const headersList = await headers()

    try {
        ;({ session, hasToken } = await getSSRSession(cookieStore.getAll(), headersList))
    } catch {
        return { session, hasToken }
    }

    return { session, hasToken }
}
