'use client'

import { AuthCompleting } from './auth-completing'

export const ForgotPasswordCompleting = () => {
    return (
        <AuthCompleting
            title={'Completing the recovery'}
            text={'We sent you an email with instructions on how to reset your password.'}
        />
    )
}
