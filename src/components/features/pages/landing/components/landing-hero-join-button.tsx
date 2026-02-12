'use client'

import { useTranslations } from 'next-intl'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'

export const LandingHeroJoinButton = () => {
    const t = useTranslations()
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<SignIn />)
    }

    return (
        <FormButton variant="orange" onClick={handleClick}>
            {t('page.landing.hero.joinNow')}
        </FormButton>
    )
}
