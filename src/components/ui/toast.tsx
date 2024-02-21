'use client'

import { CloseIcon16 } from '@/components/ui/icons'
import { useTimeout } from '@/utils/hooks/use-timeout'

type ToastProps = {
    type: 'green' | 'red'
    message: string
    onClose: () => void
}

export const Toast = ({ type, message, onClose }: ToastProps) => {
    useTimeout(onClose, 5000)
    return (
        <div className={`relative rounded-2xl bg-${type}-10 py-8 pl-8 pr-16 shadow-medium`}>
            {message}
            <div
                className={`absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer text-${type}-100`}
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
