import SuperTokens from 'supertokens-node'
import EmailPassword from 'supertokens-node/recipe/emailpassword'
import EmailVerification from 'supertokens-node/recipe/emailverification'
import Session from 'supertokens-node/recipe/session'
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword'
import type { TypeInput } from 'supertokens-node/types'

import { supertokensConfig } from './supertokens.config'

export let serverConfig = (): TypeInput => {
    return {
        appInfo: supertokensConfig,
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
            apiKey: process.env.SUPERTOKENS_API_KEY,
        },
        recipeList: [
            EmailPassword.init(),
            ThirdPartyEmailPassword.init(),
            EmailVerification.init({
                mode: 'OPTIONAL',
            }),
            Session.init(),
        ],
        isInServerlessEnv: true,
    }
}

let initialized = false
export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(serverConfig())
        initialized = true
    }
}
