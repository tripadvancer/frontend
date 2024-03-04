'use client'

import classNames from 'classnames'

import { CloseIcon16 } from '@/components/ui/icons'
import { useTimeout } from '@/utils/hooks/use-timeout'

type ToastProps = {
    variant: 'green' | 'red'
    message: string
    onClose: () => void
}

export const Toast = ({ variant, message, onClose }: ToastProps) => {
    useTimeout(onClose, 5000)

    return (
        <div
            className={classNames('relative rounded-2xl py-8 pl-8 pr-16 shadow-medium', {
                'bg-green-10': variant === 'green',
                'bg-red-10': variant === 'red',
            })}
        >
            {message}
            <div
                className={classNames('absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer', {
                    'text-green-100': variant === 'green',
                    'text-red-100': variant === 'red',
                })}
                onClick={onClose}
            >
                <CloseIcon16 />
            </div>
        </div>
    )
}

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-8">
            <div className="inner-container flex flex-col gap-5">{children}</div>
        </div>
    )
}
