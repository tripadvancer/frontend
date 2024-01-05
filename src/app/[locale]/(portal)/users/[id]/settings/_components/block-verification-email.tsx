'use client'

import Session from 'supertokens-web-js/recipe/session'

import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { BlockVerificationEmailResendButton } from './block-verification-email-resend-button'

export const BlockVerificationEmail = async () => {
    const t = useI18n()

    const doesSessionExist = await Session.doesSessionExist()
    const validationErrors = await Session.validateClaims()

    if (doesSessionExist && validationErrors.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 text-black-70">
                <p className="font-medium">{t('pages.user.account.verify_email.title')}</p>
                <p>{t('pages.user.account.verify_email.text')}</p>
            </div>
            <div>
                <BlockVerificationEmailResendButton />
            </div>
        </div>
    )
}
