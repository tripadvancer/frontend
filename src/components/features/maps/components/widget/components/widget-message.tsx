'use client'

import { FormButton } from '@/components/ui/form-button'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetMessageProps = {
    message?: React.ReactNode
    isLoading?: boolean
    onReload?: () => void
}

export const WidgetMessage = ({ message, isLoading, onReload }: WidgetMessageProps) => {
    const t = useI18n()

    if (!message) {
        return (
            <div className="flex flex-col items-center justify-center gap-y-4">
                <div className="text-center text-small text-black-40">{t('widget.common.error', { br: <br /> })}</div>
                {onReload && (
                    <FormButton type="stroke" size="small" shape="rounded" isLoading={isLoading} onClick={onReload}>
                        {t('common.action.try_again')}
                    </FormButton>
                )}
            </div>
        )
    }

    return <div className="text-center text-small text-black-40">{message}</div>
}
