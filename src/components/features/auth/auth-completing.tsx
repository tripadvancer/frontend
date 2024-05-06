'use client'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type AuthCompletingProps = {
    title: string
    message: string
}

export const AuthCompleting = ({ title, message }: AuthCompletingProps) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="h7">{title}</h1>
            <p className="text-center">{message}</p>
            <FormButton type="stroke" htmlType="button" className="w-full" onClick={dialog.close}>
                {t('common.action.ok')}
            </FormButton>
        </div>
    )
}
