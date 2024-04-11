'use client'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type ConfirmationProps = {
    title: string
    message: string
    variant?: 'blue' | 'red'
    onConfirm: () => void
}

export const Confirmation = ({ title, message, variant = 'blue', onConfirm }: ConfirmationProps) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="w-full sm:w-104">
            <div className="mb-8 flex flex-col gap-y-4">
                <h1 className="h7">{title}</h1>
                <hr className="border-black-70" />
                <p>{message}</p>
            </div>
            <div className="flex gap-x-2">
                <FormButton variant={variant} onClick={onConfirm}>
                    {t('confirm.yes')}
                </FormButton>
                <FormButton type="stroke" variant={variant} onClick={() => dialog.close()}>
                    {t('confirm.no')}
                </FormButton>
            </div>
        </div>
    )
}
