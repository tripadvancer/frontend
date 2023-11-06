import { authConfig } from '@/configs/auth.config'
import EmailPasswordWebJs from 'supertokens-web-js/recipe/emailpassword'
import EmailVerificationWebJs from 'supertokens-web-js/recipe/emailverification'
import SessionWebJs from 'supertokens-web-js/recipe/session'
import ThirdPartyEmailPasswordWebJs from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import type { SuperTokensConfig } from 'supertokens-web-js/types'

export const authFrontendConfig = (): SuperTokensConfig => {
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
