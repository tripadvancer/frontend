import { withAuth } from '@/utils/supertokens/with-auth'

import { EmailVerification } from './email-verification'

export const EmailVerificationWithAuth = async () => {
    return withAuth({
        render: ({ auth }) => (auth.isEmailVerified === false ? <EmailVerification /> : null),
    })
}
