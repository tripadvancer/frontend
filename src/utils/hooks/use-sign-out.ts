import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

// Clears the session and client state (see the SIGN_OUT handler in supertokens.client) and re-renders as anonymous
export const useSignOut = () => {
    const router = useRouter()

    return async () => {
        await waitForSuperTokensInitialization()
        await Session.signOut()
        router.push('/')
        router.refresh()
    }
}
