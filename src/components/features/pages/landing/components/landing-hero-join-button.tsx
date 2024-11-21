'use client'

import { useTranslations } from 'next-intl'

import { SignIn } from '@/components/features/auth/sign-in'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'

export const LandingHeroJoinButton = () => {
    const t = useTranslations()
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
