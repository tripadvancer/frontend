'use client'

import { ReactNode } from 'react'

import { FormButton } from '@/components/ui/form-button'

type WidgetMessageProps = {
    message?: ReactNode
    actionCaption?: string
    isLoading?: boolean
    onAction?: () => void
}

export const WidgetMessage = ({ message, actionCaption, isLoading, onAction }: WidgetMessageProps) => {
    return (
        <section className="mx-auto flex flex-col items-center justify-center gap-y-4">
            <p className="text-black-40 text-center">
                {message ? (
                    message
                ) : (
                    <>
                        An unexpected error has occurred.
                        <br />
                        Please try again later.
                    </>
                )}
            </p>
            {onAction && (
                <FormButton type="stroke" size="small" shape="rounded" isLoading={isLoading} onClick={onAction}>
                    {actionCaption ? actionCaption : 'Try again'}
                </FormButton>
            )}
        </section>
    )
}
