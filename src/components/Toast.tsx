'use client'

import { ReactNode } from 'react'

import { useTimeout } from '@/hooks/useTimeout'

export enum ToastType {
    success = 'success',
    error = 'error',
    info = 'info',
}

type ToastProps = {
    type: ToastType
    message: string
    onClose: () => void
}

type ToastContainerProps = {
    children: ReactNode
}

export const Toast = ({ type, message, onClose }: ToastProps) => {
    useTimeout(onClose, 5000)

    return <div>{message}</div>
}

export const ToastContainer = ({ children }: ToastContainerProps) => {
    return <div>{children}</div>
}
