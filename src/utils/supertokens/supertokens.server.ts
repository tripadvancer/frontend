import SuperTokens from 'supertokens-node'
import EmailVerification from 'supertokens-node/recipe/emailverification'
import Session from 'supertokens-node/recipe/session'

import { getSuperTokensConfig } from './supertokens.config'

// Only verifies sessions for server rendering; the auth API itself is served by the backend
const APP_NAME = 'Tripadvancer'

let isInitialized = false

export function ensureSuperTokensInit() {
    if (isInitialized) {
        return
    }

    SuperTokens.init({
        appInfo: getSuperTokensConfig(APP_NAME),
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI!,
            apiKey: process.env.SUPERTOKENS_API_KEY,
        },
        recipeList: [EmailVerification.init({ mode: 'OPTIONAL' }), Session.init()],
        isInServerlessEnv: true,
    })
    isInitialized = true
}
