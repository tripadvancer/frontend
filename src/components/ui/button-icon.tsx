import { ReactNode } from 'react'

import { Spinner } from '@/components/ui/spinner'

type ButtonIconProps = {
    children: ReactNode
    isLoading?: boolean
    onClick: () => void
}

export const ButtonIcon = ({ children, isLoading, onClick }: ButtonIconProps) => {
    return (
        <div
            className="hover-animated flex-center h-10 w-10 cursor-pointer rounded-lg border border-blue-20 text-blue-100 hover:border-blue-active hover:text-blue-active"
            onClick={onClick}
        >
            {isLoading ? <Spinner size={24} /> : children}
        </div>
    )
}
