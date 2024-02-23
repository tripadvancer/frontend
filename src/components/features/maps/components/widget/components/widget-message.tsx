'use client'

import { FormButton } from '@/components/ui/form-button'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetMessageProps = {
    message?: React.ReactNode
    actionCaption?: string
    isLoading?: boolean
    onAction?: () => void
}

export const WidgetMessage = ({ message, actionCaption, isLoading, onAction }: WidgetMessageProps) => {
    const t = useI18n()

    return (
        <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="text-center text-small text-black-40">
                {message ? message : t('widget.common.error', { br: <br /> })}
            </div>
            {onAction && (
                <FormButton type="stroke" size="small" shape="rounded" isLoading={isLoading} onClick={onAction}>
                    {actionCaption ? actionCaption : t('common.action.try_again')}
                </FormButton>
            )}
        </div>
    )
}
