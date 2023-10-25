'use client'

import { Button } from '@/components/button'
import { ButtonStroke } from '@/components/button-stroke'
import { useDialog } from '@/providers/dialog-provider'
import { useScopedI18n } from '@/utils/i18n.client'

type ConfirmationProps = {
    title: string
    message: string
    variant?: 'blue' | 'red'
    onConfirm: () => void
}

export const Confirmation = ({ title, message, variant = 'blue', onConfirm }: ConfirmationProps) => {
    const t = useScopedI18n('common')
    const dialog = useDialog()

    return (
        <div className="w-full sm:w-104">
            <div className="mb-8 flex flex-col gap-y-4">
                <h1 className="text-h7">{title}</h1>
                <hr className="border-black-70" />
                <p>{message}</p>
            </div>
            <div className="flex gap-x-2">
                <Button variant={variant} onClick={onConfirm}>
                    {t('cta.confirm')}
                </Button>
                <ButtonStroke variant={variant} onClick={() => dialog.close()}>
                    {t('cta.cancel')}
                </ButtonStroke>
            </div>
        </div>
    )
}
