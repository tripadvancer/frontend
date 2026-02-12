'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'

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
