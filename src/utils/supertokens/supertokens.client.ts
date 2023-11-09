import type { SuperTokensConfig } from 'supertokens-web-js/lib/build/types'
import EmailPasswordWebJs from 'supertokens-web-js/recipe/emailpassword'
import EmailVerificationWebJs from 'supertokens-web-js/recipe/emailverification'
import SessionWebJs from 'supertokens-web-js/recipe/session'
import ThirdPartyEmailPasswordWebJs from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { supertokensConfig } from './supertokens.config'

export const clientConfig = (): SuperTokensConfig => {
    return {
        appInfo: supertokensConfig,
        recipeList: [
            ThirdPartyEmailPasswordWebJs.init(),
            EmailVerificationWebJs.init(),
            EmailPasswordWebJs.init(),
            SessionWebJs.init(),
        ],
    }
}
