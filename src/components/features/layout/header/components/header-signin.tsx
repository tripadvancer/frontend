'use client'

import { CircleUserIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from 'usehooks-ts'

import { SignIn } from '@/components/features/auth/sign-in'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'

export const HeaderSignIn = () => {
    const t = useTranslations()
    const dialog = useDialog()
    const isMobile = useMediaQuery('(max-width: 639px)')

    const handleClick = () => {
        dialog.open(<SignIn />)
    }

    if (isMobile) {
        return (
            <div className="link" onClick={handleClick}>
                <CircleUserIcon />
            </div>
        )
    }

    return (
        <FormButton size="small" shape="rounded" onClick={handleClick}>
            {t('layout.header.signIn')}
        </FormButton>
    )
}
