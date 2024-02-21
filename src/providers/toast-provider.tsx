'use client'

import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

import { Toast, ToastContainer } from '@/components/ui/toast'

interface ToastInterface {
    id: number
    type: 'green' | 'red'
    message: string
}

interface ToastContextInterface {
    success: (message: string) => void
    error: (message: string) => void
}

type ToastProviderProps = {
    children: React.ReactNode
}

const defaultValue: ToastContextInterface = {
    success: () => {},
    error: () => {},
}

export const ToastContext = createContext(defaultValue)

export function useToast(): ToastContextInterface {
    const context = useContext(ToastContext)

    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }

    return context
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<ToastInterface[]>([])

    const success = (message: string) => {
        const id = Date.now()
        const type = 'green'
        setToasts((currentToasts: ToastInterface[]) => [...currentToasts, { id, message, type }])
    }

    const error = (message: string) => {
        const id = Date.now()
        const type = 'red'
        setToasts((currentToasts: ToastInterface[]) => [...currentToasts, { id, message, type }])
    }

    const close = (id: number) =>
        setToasts((currentToasts: ToastInterface[]) => currentToasts.filter((toast: ToastInterface) => toast.id !== id))

    const contextValue = useMemo(() => ({ success, error }), [])

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer>
                {toasts.map((toast: ToastInterface) => (
                    <Toast key={toast.id} type={toast.type} message={toast.message} onClose={() => close(toast.id)} />
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    )
}
