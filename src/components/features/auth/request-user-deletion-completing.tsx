'use client'

import { AuthCompleting } from './auth-completing'

export const RequestUserDeletionCompleting = () => {
    return (
        <AuthCompleting
            title={'Request account deletion'}
            text={'We have sent you an email with instructions on how to confirm the deletion of your account.'}
        />
    )
}
