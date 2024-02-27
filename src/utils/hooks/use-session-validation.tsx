import Session from 'supertokens-web-js/recipe/session'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'

export function useSessionValidation(callback: () => void) {
    const dialog = useDialog()

    const handleClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        const validationErrors = await Session.validateClaims()
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()

        if (validationErrors.length > 0) {
            dialog.open(<ClaimEmailError userId={accessTokenPayload.userId} />)
            return
        }

        callback()
    }

    return handleClick
}
