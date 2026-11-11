'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'

export const LandingHeroJoinButton = () => {
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<SignIn />)
    }

    return (
        <FormButton variant="orange" onClick={handleClick}>
            Join Now
        </FormButton>
    )
}
