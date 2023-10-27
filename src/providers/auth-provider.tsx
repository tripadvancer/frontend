'use client'

import SuperTokensWebJs from 'supertokens-web-js'

import { authFrontendConfig } from '@/configs/auth.frontend.config'

if (typeof window !== 'undefined') {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokensWebJs.init(authFrontendConfig())
}

export const AuthProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return children
}
