import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { getI18n } from '@/utils/i18n/i18n.server'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { EmailVerificationLearnMoreLink } from './email-verification-learn-more-link'

export const EmailVerificationNotice = async () => {
    const t = await getI18n()
    const { session, hasToken } = await getSSRSession()

    if (!session && hasToken) {
        return <TryRefreshComponent />
    }

    // todo: create helper for get claim value on client and server
    const emailVerificationClaim = await session?.getClaimValue(EmailVerificationClaim)
    const emailIsNotVerified = emailVerificationClaim === false // because it can be undefined
    const accessTokenPayload = session?.getAccessTokenPayload()

    if (emailIsNotVerified) {
        return (
            <div className="bg-orange-10 py-2 text-center text-small text-black-70">
                <div className="container">
                    {t('email_verification_notice.text', {
                        learn_more_link: <EmailVerificationLearnMoreLink userId={accessTokenPayload.userId} />,
                    })}
                </div>
            </div>
        )
    }

    return null
}
