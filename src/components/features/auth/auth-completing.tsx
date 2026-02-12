'use client'

import { useTranslations } from 'next-intl'

import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'

type AuthCompletingProps = {
    title: string
    text: string
}

export const AuthCompleting = ({ title, text }: AuthCompletingProps) => {
    const t = useTranslations()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="h7">{title}</h1>
            <p className="text-center">{text}</p>
            <FormButton type="stroke" htmlType="button" className="w-full" onClick={dialog.close}>
                {t('common.action.ok')}
            </FormButton>
        </div>
    )
}
