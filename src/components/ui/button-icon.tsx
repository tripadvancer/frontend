import { ReactNode } from 'react'

import classNames from 'classnames'

import { Spinner } from '@/components/ui/spinner'

type ButtonIconProps = {
    children: ReactNode
    size?: 'small' | 'medium'
    isLoading?: boolean
    onClick: () => void
}

export const ButtonIcon = ({ children, size, isLoading, onClick }: ButtonIconProps) => {
    return (
        <div
            className={classNames(
                'hover-animated flex-center cursor-pointer rounded-lg border border-blue-20 text-blue-100 hover:border-blue-active hover:text-blue-active',
                {
                    'h-8 w-8': size === 'small',
                    'h-10 w-10': size === 'medium',
                },
            )}
            onClick={onClick}
        >
            {isLoading ? <Spinner size={size === 'small' ? 16 : 24} /> : children}
        </div>
    )
}
