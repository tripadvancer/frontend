'use client'

import Session from 'supertokens-web-js/recipe/session'

import { useI18n } from '@/utils/i18n/i18n.client'

import { EmailVerificationLearnMoreLink } from './email-verification-learn-more-link'

export const EmailVerificationNotice = async () => {
    const t = useI18n()

    const doesSessionExist = await Session.doesSessionExist()
    if (!doesSessionExist) {
        return null
    }

    const validationErrors = await Session.validateClaims()
    if (validationErrors.length !== 0) {
        return null
    }

    const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()

    return (
        <div className="relative z-50 bg-orange-10 py-2 text-center text-small text-black-70">
            <div className="container">
                {t('email_verification_notice.text', {
                    learn_more_link: <EmailVerificationLearnMoreLink userId={accessTokenPayload.userId} />,
                })}
            </div>
        </div>
    )
}
