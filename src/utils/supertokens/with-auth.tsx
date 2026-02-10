import { ReactNode } from 'react'

import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { redirect } from 'next/navigation'

import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-component'
import { AuthContext } from '@/utils/types/common'

type OnUnauth = 'render' | 'notFound' | { redirectTo: string }

type RenderProps<T> = {
    auth: AuthContext
    data: T | null
}

export async function withAuth<T = unknown>(options: {
    getAuthData?: () => Promise<T>
    onUnauth?: OnUnauth
    render: (props: RenderProps<T>) => ReactNode
}) {
    const { getAuthData, onUnauth = 'render', render } = options
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            if (onUnauth === 'notFound') {
                redirect('/404')
            }

            if (typeof onUnauth === 'object') {
                redirect(onUnauth.redirectTo)
            }

            return render({
                auth: {
                    activeUserId: undefined,
                    isAuth: false,
                    isEmailVerified: undefined,
                },
                data: null,
            })
        }

        return <TryRefreshComponent key={Date.now()} />
    }

    return render({
        auth: {
            activeUserId: session.getAccessTokenPayload().userId ?? null,
            isAuth: true,
            isEmailVerified: await session.getClaimValue(EmailVerificationClaim),
        },
        data: getAuthData ? await getAuthData() : null,
    })
}
