import SuperTokens from 'supertokens-node'
import Dashboard from 'supertokens-node/recipe/dashboard'
import EmailVerificationNode from 'supertokens-node/recipe/emailverification'
import SessionNode from 'supertokens-node/recipe/session'
import ThirdPartyEmailPasswordNode from 'supertokens-node/recipe/thirdpartyemailpassword'
import type { TypeInput } from 'supertokens-node/types'

import { appInfo } from './app.info'

export let authBackendConfig = (): TypeInput => {
    return {
        appInfo,
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
            apiKey: process.env.SUPERTOKENS_API_KEY,
        },
        recipeList: [
            ThirdPartyEmailPasswordNode.init(),
            EmailVerificationNode.init({ mode: 'REQUIRED' }),
            SessionNode.init(),
            Dashboard.init(),
        ],
        isInServerlessEnv: true,
    }
}

let initialized = false
export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(authBackendConfig())
        initialized = true
    }
}
