import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { getSSRSessionHelper } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { EmailVerificationNotice } from './email-verification-notice'

export const EmailVerification = async () => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session && hasToken) {
        return <TryRefreshComponent />
    }

    const isMailVerified = await session?.getClaimValue(EmailVerificationClaim)

    if (isMailVerified === false) {
        const userId = session?.getAccessTokenPayload().userId
        return <EmailVerificationNotice userId={userId} />
    }

    return null
}
