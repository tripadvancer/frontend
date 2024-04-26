'use client'

import { ReactNode } from 'react'

import SuperTokensAuth from 'supertokens-web-js'

import { clientConfig } from './supertokens.client'

if (typeof window !== 'undefined') {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokensAuth.init(clientConfig())
}

export const SuperTokensInit = ({ children }: { children: ReactNode }) => {
    return children
}
