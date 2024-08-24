'use client'

import { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'

type WidgetMessageProps = {
    message?: ReactNode
    actionCaption?: string
    isLoading?: boolean
    onAction?: () => void
}

export const WidgetMessage = ({ message, actionCaption, isLoading, onAction }: WidgetMessageProps) => {
    const t = useTranslations()

    return (
        <section className="mx-auto flex flex-col items-center justify-center gap-y-4">
            <p className="text-center text-black-40">
                {message ? message : t.rich('map.widget.error', { br: () => <br /> })}
            </p>
            {onAction && (
                <FormButton type="stroke" size="small" shape="rounded" isLoading={isLoading} onClick={onAction}>
                    {actionCaption ? actionCaption : t('common.action.tryAgain')}
                </FormButton>
            )}
        </section>
    )
}
