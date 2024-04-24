'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const HeaderButtonSignIn = () => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<SignIn />)
    }

    return (
        <FormButton size="small" shape="rounded" onClick={handleClick}>
            {t('common.link.sign_in')}
        </FormButton>
    )
}
