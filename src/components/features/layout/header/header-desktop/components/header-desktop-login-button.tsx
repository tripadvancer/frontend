'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'

export const HeaderDesktopLoginButton = () => {
    const dialog = useDialog()

    const handleLogin = () => {
        dialog.open(<SignIn />)
    }

    return (
        <FormButton size="small" shape="rounded" onClick={handleLogin}>
            Sign In
        </FormButton>
    )
}
