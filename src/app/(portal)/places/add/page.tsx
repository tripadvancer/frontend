import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'

import { PlaceAdd } from '@/components/features/pages/place-form/place-add'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export const metadata: Metadata = {
    title: 'Add Place',
    robots: 'noindex, nofollow',
    alternates: {
        canonical: '/places/add',
    },
}

export default async function AddPlacePage() {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return notFound()
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const isEmailVerified = await session?.getClaimValue(EmailVerificationClaim)

    if (isEmailVerified === false) {
        return notFound()
    }

    return <PlaceAdd />
}
