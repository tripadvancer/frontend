import Session from 'supertokens-web-js/recipe/session'

import { VerificationEmailError } from '@/components/features/auth/verification-email-error'
import { getI18n } from '@/utils/i18n/i18n.server'

export const MailVerificationNotice = async () => {
    const t = await getI18n()

    // const doesSessionExist = await Session.doesSessionExist()
    // if (!doesSessionExist) {
    //     return null
    // }

    // const validationErrors = await Session.validateClaims()
    // if (validationErrors.length === 0) {
    //     return null
    // }

    return (
        <div className="bg-orange-10 py-2 text-center text-sm text-black-70">
            <div className="container">
                {t('mail_verification.notice')}{' '}
                {/* <span className="link-orange" onClick={() => dialog.open(<VerificationEmailError />)}>
                    {t('mail_verification.learn_more')}
                </span> */}
            </div>
        </div>
    )
}
