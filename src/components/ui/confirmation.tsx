'use client'

import { useTranslations } from 'next-intl'

import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

type ConfirmationProps = {
    title: string
    message: string
    variant?: 'blue' | 'red'
    onConfirm: () => void
}

export const Confirmation = ({ title, message, variant = 'blue', onConfirm }: ConfirmationProps) => {
    const t = useTranslations()
    const dialog = useDialog()

    useKeypress(Keys.ENTER, () => {
        onConfirm()
    })

    return (
        <div className="w-full sm:w-104">
            <div className="mb-8 flex flex-col gap-y-4">
                <h1 className="h7 break-words">{title}</h1>
                <hr className="border-black-70" />
                <p>{message}</p>
            </div>
            <div className="flex gap-x-2">
                <FormButton variant={variant} onClick={onConfirm}>
                    {t('common.action.confirm')}
                </FormButton>
                <FormButton type="stroke" variant={variant} onClick={() => dialog.close()}>
                    {t('common.action.cancel')}
                </FormButton>
            </div>
        </div>
    )
}
