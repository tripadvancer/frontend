import type { SuperTokensConfig } from 'supertokens-web-js/lib/build/types'
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'
import EmailVerification from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { resetWidgetState } from '@/redux/features/widget-slice'
import { api } from '@/redux/services/api'
import { store } from '@/redux/store'

import { supertokensConfig } from './supertokens.config'

export const clientConfig = (): SuperTokensConfig => {
    return {
        appInfo: supertokensConfig,
        recipeList: [
            EmailPassword.init(),
            ThirdPartyEmailPassword.init({
                override: {
                    functions: oI => {
                        return {
                            ...oI,
                            emailPasswordSignIn: async function (input) {
                                const response = await oI.emailPasswordSignIn(input)

                                if (response.status === 'OK') {
                                    store.dispatch(api.util.invalidateTags(['Favorites', 'Places', 'Visited']))
                                }

                                return response
                            },
                        }
                    },
                },
            }),
            EmailVerification.init(),
            Session.init({
                override: {
                    functions: oI => {
                        return {
                            ...oI,
                            signOut: async function (input) {
                                await oI.signOut(input)
                                store.dispatch(resetWidgetState())
                                store.dispatch(api.util.resetApiState())
                            },
                        }
                    },
                },
            }),
        ],
    }
}
