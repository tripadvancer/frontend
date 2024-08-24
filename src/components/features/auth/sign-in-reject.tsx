'use client'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'

export const SignInReject = () => {
    const t = useTranslations()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="h7">{t('auth.signInReject.title')}</h1>
            <p className="text-center">{t('auth.signInReject.text')}</p>
            <FormButton type="stroke" htmlType="button" className="w-full" onClick={dialog.close}>
                {t('common.action.ok')}
            </FormButton>
        </div>
    )
}
