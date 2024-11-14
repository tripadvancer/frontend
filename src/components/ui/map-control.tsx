'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

import { Spinner } from '@/components/ui/spinner'

type MapControlProps = {
    children: ReactNode
    desktopOnly?: boolean
    isLoading?: boolean
    onClick: () => void
}

export const MapControl = ({ children, desktopOnly, isLoading, onClick }: MapControlProps) => {
    return (
        <button
            className={classNames(
                'hover-animated size-10 cursor-pointer items-center justify-center rounded-lg bg-white shadow-black enabled:hover:text-blue-active disabled:cursor-not-allowed sm:size-8',
                `${desktopOnly ? 'hidden sm:flex' : 'flex'}`,
            )}
            disabled={isLoading}
            onClick={onClick}
        >
            {isLoading ? <Spinner size={16} /> : children}
        </button>
    )
}
