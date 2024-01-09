'use client'

import { ChangeEmail } from '@/components/features/auth/change-email'
import { FormButtonMinor } from '@/components/ui/form-button-minor'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const BlockChangeEmail = () => {
    const t = useI18n()
    const dialog = useDialog()

    const handleChangeEmail = () => {
        dialog.open(<ChangeEmail />)
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 text-black-70">
                <p className="font-medium">{t('pages.user.account.change_email.title')}</p>
                <p>{t('pages.user.account.change_email.text')}</p>
            </div>
            <div>
                <FormButtonMinor variant="blue" onClick={handleChangeEmail}>
                    {t('pages.user.account.change_email.action')}
                </FormButtonMinor>
            </div>
        </div>
    )
}
