'use client'

import { useMediaQuery } from 'usehooks-ts'

import { SignIn } from '@/components/features/auth/sign-in'
import { FormButton } from '@/components/ui/form-button'
import { UserIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const HeaderSignIn = () => {
    const t = useI18n()
    const dialog = useDialog()
    const isMobile = useMediaQuery('(max-width: 639px)')

    const handleClick = () => {
        dialog.open(<SignIn />)
    }

    if (isMobile) {
        return (
            <div className="link" onClick={handleClick}>
                <UserIcon24 />
            </div>
        )
    }

    return (
        <FormButton size="small" shape="rounded" onClick={handleClick}>
            {t('common.link.sign_in')}
        </FormButton>
    )
}
