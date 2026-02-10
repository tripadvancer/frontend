'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'

type HeaderMobileLoginButtonProps = {
    closeMobileMenu: () => void
}

export const HeaderMobileLoginButton = ({ closeMobileMenu }: HeaderMobileLoginButtonProps) => {
    const dialog = useDialog()

    const handleLogin = () => {
        dialog.open(<SignIn />)
        closeMobileMenu()
    }

    return <FormButton onClick={handleLogin}>Login</FormButton>
}
