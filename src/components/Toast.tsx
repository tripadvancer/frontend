'use client'

import classNames from 'classnames'

import { useTimeout } from '@/hooks/useTimeout'

export enum ToastType {
    success = 'success',
    error = 'error',
}

type ToastProps = {
    type: ToastType
    message: string
    onClose: () => void
}

export const Toast = ({ type, message, onClose }: ToastProps) => {
    useTimeout(onClose, 5000)
    return (
        <div
            className={classNames('shadow-medium relative rounded-2xl p-8 text-sm', {
                'bg-custom-green-10': type === ToastType.success,
                'bg-custom-red-10': type === ToastType.error,
            })}
        >
            {message}
            <div
                className={classNames('absolute right-8 top-1/2 -translate-y-1/2 transform cursor-pointer', {
                    'text-custom-green-100': type === ToastType.success,
                    'text-custom-red-100': type === ToastType.error,
                })}
                onClick={onClose}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M8 9.48679L3.48679 14L2 12.5132L6.51321 8L2 3.48679L3.48679 2L8 6.51321L12.5132 2L14 3.48679L9.48679 8L14 12.5132L12.5132 14L8 9.48679Z"
                    />
                </svg>
            </div>
        </div>
    )
}

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed left-0 right-0 top-4 z-50">
            <div className="inner-container flex flex-col gap-5">{children}</div>
        </div>
    )
}
