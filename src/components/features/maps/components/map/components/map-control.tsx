'use client'

import classNames from 'classnames'

import { Spinner } from '@/components/ui/spinner'

type MapControlProps = {
    children: React.ReactNode
    isLoading?: boolean
    onClick: () => void
}

export const MapControl = ({ children, isLoading, onClick }: MapControlProps) => {
    return (
        <button
            className={classNames(
                'shadow-black flex-center hover-animated size-8 cursor-pointer rounded-lg bg-white hover:text-blue-active',
                {
                    'text-blue-active': isLoading,
                },
            )}
            disabled={isLoading}
            onClick={onClick}
        >
            {isLoading ? <Spinner size={16} /> : children}
        </button>
    )
}
