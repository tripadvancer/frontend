'use client'

import { ReactNode } from 'react'

import SuperTokensWebJs from 'supertokens-web-js'

import { clientConfig } from './supertokens.client'

if (typeof window !== 'undefined') {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokensWebJs.init(clientConfig())
}

export const SuperTokensProvider = ({ children }: { children: ReactNode }) => {
    return children
}
