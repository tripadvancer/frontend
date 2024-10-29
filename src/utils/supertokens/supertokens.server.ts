import SuperTokens from 'supertokens-node'
import EmailVerification from 'supertokens-node/recipe/emailverification'
import Session from 'supertokens-node/recipe/session'
import { TypeInput } from 'supertokens-node/types'

import { supertokensConfig } from './supertokens.config'

export let serverConfig = (): TypeInput => {
    return {
        appInfo: supertokensConfig,
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
            apiKey: process.env.SUPERTOKENS_API_KEY,
        },
        recipeList: [
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
