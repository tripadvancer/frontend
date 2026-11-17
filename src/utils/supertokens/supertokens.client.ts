import EmailPassword from 'supertokens-web-js/recipe/emailpassword'
import EmailVerification from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import type { SuperTokensConfig } from 'supertokens-web-js/types'

import { setWidgetActiveList } from '@/utils/redux/features/widget-slice'
import { USER_DEPENDENT_TAGS, api } from '@/utils/redux/services/api'
import { store } from '@/utils/redux/store'

import { getSuperTokensConfig } from './supertokens.config'

// EmailPassword handles the password reset (its emails are customized on the backend),
// ThirdPartyEmailPassword handles sign in and sign up with email or Google
export const clientConfig = (appName: string): SuperTokensConfig => ({
    appInfo: getSuperTokensConfig(appName),
    recipeList: [
        EmailPassword.init(),
        ThirdPartyEmailPassword.init(),
        EmailVerification.init(),
        Session.init({
            onHandleEvent: event => {
                switch (event.action) {
                    // Sign in, sign up and Google sign in: refetch data that depends on the user
                    case 'SESSION_CREATED':
                        store.dispatch(api.util.invalidateTags([...USER_DEPENDENT_TAGS]))
                        break

                    case 'SIGN_OUT':
                        store.dispatch(api.util.resetApiState())
                        store.dispatch(setWidgetActiveList(null))
                        break
                }
            },
        }),
    ],
})
