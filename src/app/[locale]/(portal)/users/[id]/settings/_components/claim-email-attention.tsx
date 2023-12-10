'use client'

import Session from 'supertokens-web-js/recipe/session'

import { useI18n } from '@/utils/i18n/i18n.client'

import { ClaimEmailAttentionAction } from './claim-email-attention-action'

export const ClaimEmailAttention = async () => {
    const t = useI18n()
    const doesSessionExist = await Session.doesSessionExist()
    const validationErrors = await Session.validateClaims()

    if (doesSessionExist && validationErrors.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-y-4 rounded-lg bg-orange-10 p-4">
            <div className="flex flex-col gap-y-2 text-black-70">
                <p className="font-medium">{t('claim.email.title')}</p>
                <p>{t('claim.email.message')}</p>
            </div>
            <ClaimEmailAttentionAction />
        </div>
    )
}
