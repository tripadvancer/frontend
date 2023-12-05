import type { SuperTokensConfig } from 'supertokens-web-js/lib/build/types'
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'
import EmailVerification from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { supertokensConfig } from './supertokens.config'

export const clientConfig = (): SuperTokensConfig => {
    return {
        appInfo: supertokensConfig,
        recipeList: [ThirdPartyEmailPassword.init(), EmailVerification.init(), EmailPassword.init(), Session.init()],
    }
}
