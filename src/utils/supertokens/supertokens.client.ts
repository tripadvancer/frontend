import type { SuperTokensConfig } from 'supertokens-web-js/lib/build/types'
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'
import EmailVerification from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { userSlice } from '@/redux/features/user-slice'
import { api } from '@/redux/services/api'
import { userAPI } from '@/redux/services/user-api'
import { store } from '@/redux/store'

import { supertokensConfig } from './supertokens.config'

export const clientConfig = (): SuperTokensConfig => {
    return {
        appInfo: supertokensConfig,
        recipeList: [
            ThirdPartyEmailPassword.init({
                override: {
                    functions: oI => {
                        return {
                            ...oI,
                            emailPasswordSignIn: async function (input) {
                                const response = await oI.emailPasswordSignIn(input)

                                if (response.status === 'OK') {
                                    store
                                        .dispatch(userAPI.endpoints.getUserInfo.initiate())
                                        .unwrap()
                                        .then(response => {
                                            store.dispatch(userSlice.actions.setCredentials(response))
                                            store.dispatch(api.util.invalidateTags(['Favorites', 'Places', 'Visited']))
                                        })
                                }

                                return response
                            },
                        }
                    },
                },
            }),
            EmailVerification.init(),
            EmailPassword.init(),
            Session.init({
                override: {
                    functions: oI => {
                        return {
                            ...oI,
                            signOut: async function (input) {
                                await oI.signOut(input)
                                store.dispatch(userSlice.actions.unSetCredentials())
                                store.dispatch(api.util.resetApiState())
                            },
                        }
                    },
                },
            }),
        ],
    }
}
