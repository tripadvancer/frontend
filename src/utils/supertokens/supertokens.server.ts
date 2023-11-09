import SuperTokens from 'supertokens-node'
import SessionNode from 'supertokens-node/recipe/session'
import UserMetadataNode from 'supertokens-node/recipe/usermetadata'
import type { TypeInput } from 'supertokens-node/types'

import { supertokensConfig } from './supertokens.config'

export let serverConfig = (): TypeInput => {
    return {
        appInfo: supertokensConfig,
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
            apiKey: process.env.SUPERTOKENS_API_KEY,
        },
        recipeList: [UserMetadataNode.init(), SessionNode.init()],
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
