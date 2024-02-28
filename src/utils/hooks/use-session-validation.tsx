import React from 'react'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'

import { useSupertokens } from '../supertokens/supertokens.hooks'

export function useSessionValidation(callback: () => void) {
    const supertokens = useSupertokens()
    const dialog = useDialog()

    const handleClick = () => {
        supertokens.isAuth ? handleAuthenticatedUser() : handleUnauthenticatedUser()
    }

    const handleAuthenticatedUser = () => {
        !supertokens.isMailVerified ? showClaimEmailError() : callback()
    }

    const showClaimEmailError = () => {
        dialog.open(<ClaimEmailError userId={supertokens.activeUserId as number} />)
    }

    const handleUnauthenticatedUser = () => {
        dialog.open(<SignIn />)
    }

    return handleClick
}
