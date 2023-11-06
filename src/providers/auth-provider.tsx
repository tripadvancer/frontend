'use client'

import SuperTokensWebJs from 'supertokens-web-js'

import { authClientConfig } from '@/utils/auth.client'

if (typeof window !== 'undefined') {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokensWebJs.init(authClientConfig())
}

export const AuthProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return children
}
