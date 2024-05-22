import { ReactNode } from 'react'

import { useScrollLock } from 'usehooks-ts'

import { CloseIcon24 } from '@/components/ui/icons'

type DialogProps = {
    content: ReactNode
    onClose: () => void
}

export const Dialog = ({ content, onClose }: DialogProps) => {
    useScrollLock()

    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 overflow-y-auto p-4 sm:p-16">
            <div className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black-100 opacity-50" />
            <div className="flex-center min-h-full">
                <div className="relative z-50 w-full rounded-2xl bg-white px-8 py-16 shadow-lg sm:w-auto sm:p-16">
                    <div
                        className="hover-animated absolute right-4 top-4 cursor-pointer text-black-15 hover:text-blue-active"
                        onClick={onClose}
                    >
                        <CloseIcon24 />
                    </div>
                    {content}
                </div>
            </div>
        </div>
    )
}
