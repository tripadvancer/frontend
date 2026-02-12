'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'

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
