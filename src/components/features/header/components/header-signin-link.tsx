'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { UserIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const HeaderSignInLink = () => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="link flex items-center gap-x-2 text-big-bold" onClick={() => dialog.open(<SignIn />)}>
            <span className="hidden md:block">{t('common.link.sign_in')}</span>
            <UserIcon24 />
        </div>
    )
}
