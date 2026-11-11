'use client'

import { AuthCompleting } from './auth-completing'

export const ChangeEmailCompleting = () => {
    return (
        <AuthCompleting
            title={'Confirm your new email'}
            text={
                'We have sent you a verification email. After confirming your new email address, you will be able to sign in using it.'
            }
        />
    )
}
