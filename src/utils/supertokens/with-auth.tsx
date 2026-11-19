import { ReactNode } from 'react'

import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { notFound, redirect } from 'next/navigation'

import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-component'
import { AuthContext } from '@/utils/types/common'

type OnUnauth = 'render' | 'notFound' | { redirectTo: string }

type RenderProps<T> = {
    auth: AuthContext
    data: T | null
}

type WithAuthOptions<T> = {
    // Loaded only for authenticated users
    getAuthData?: () => Promise<T>
    onUnauth?: OnUnauth
    render: (props: RenderProps<T>) => ReactNode
}

const UNAUTH_CONTEXT: AuthContext = {
    activeUserId: undefined,
    isAuth: false,
    isEmailVerified: undefined,
}

// Resolves the SuperTokens session of a server component. An expired access token is refreshed on the client.
export async function withAuth<T = unknown>({ getAuthData, onUnauth = 'render', render }: WithAuthOptions<T>) {
    const { session, hasToken } = await getSSRSessionHelper()

    if (session) {
        return render({
            auth: {
                activeUserId: session.getAccessTokenPayload().userId,
                isAuth: true,
                isEmailVerified: await session.getClaimValue(EmailVerificationClaim),
            },
            data: getAuthData ? await getAuthData() : null,
        })
    }

    if (hasToken) {
        return <TryRefreshComponent key={Date.now()} />
    }

    if (onUnauth === 'notFound') {
        notFound()
    }

    if (typeof onUnauth === 'object') {
        redirect(onUnauth.redirectTo)
    }

    return render({ auth: UNAUTH_CONTEXT, data: null })
}
