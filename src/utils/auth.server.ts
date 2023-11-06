import SuperTokens from 'supertokens-node'
import SessionNode from 'supertokens-node/recipe/session'
import UserMetadata from 'supertokens-node/recipe/usermetadata'
import type { TypeInput } from 'supertokens-node/types'

import { authConfig } from '@/configs/auth.config'

export let authServerConfig = (): TypeInput => {
    return {
        appInfo: authConfig,
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
            apiKey: process.env.SUPERTOKENS_API_KEY,
        },
        recipeList: [UserMetadata.init(), SessionNode.init()],
        isInServerlessEnv: true,
    }
}

let initialized = false
export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(authServerConfig())
        initialized = true
    }
}
