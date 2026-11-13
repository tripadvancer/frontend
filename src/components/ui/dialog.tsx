import { ReactNode } from 'react'

import { XIcon } from 'lucide-react'
import { useScrollLock } from 'usehooks-ts'

type DialogProps = {
    content: ReactNode
    onClose: () => void
}

export const Dialog = ({ content, onClose }: DialogProps) => {
    useScrollLock()

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-50 overflow-y-auto p-4 sm:p-16">
            <div className="bg-black-100 fixed top-0 right-0 bottom-0 left-0 z-40 opacity-50" />
            <div className="flex-center min-h-full">
                <div className="relative z-50 w-full rounded-2xl bg-white p-8 shadow-lg sm:w-auto sm:p-16">
                    <div
                        className="hover-animated text-black-15 hover:text-blue-active absolute top-4 right-4 cursor-pointer"
                        onClick={onClose}
                    >
                        <XIcon />
                    </div>
                    {content}
                </div>
            </div>
        </div>
    )
}
