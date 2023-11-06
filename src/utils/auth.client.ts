import EmailPasswordWebJs from 'supertokens-web-js/recipe/emailpassword'
import EmailVerificationWebJs from 'supertokens-web-js/recipe/emailverification'
import SessionWebJs from 'supertokens-web-js/recipe/session'
import ThirdPartyEmailPasswordWebJs from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import type { SuperTokensConfig } from 'supertokens-web-js/types'

import { authConfig } from '@/configs/auth.config'

export const authClientConfig = (): SuperTokensConfig => {
    return {
        appInfo: authConfig,
        recipeList: [
            ThirdPartyEmailPasswordWebJs.init(),
            EmailVerificationWebJs.init(),
            EmailPasswordWebJs.init(),
            SessionWebJs.init(),
        ],
    }
}
