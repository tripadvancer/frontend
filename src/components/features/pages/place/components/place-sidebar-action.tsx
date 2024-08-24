'use client'

import { ReactNode } from 'react'

import { Spinner } from '@/components/ui/spinner'

type PlaceSidebarActionProps = {
    caption: string
    icon: ReactNode
    isLoading?: boolean
    onClick: () => void
}

export const PlaceSidebarAction = ({ caption, icon, isLoading, onClick }: PlaceSidebarActionProps) => {
    return (
        <div
            className="flex-center aspect-square flex-1 cursor-pointer flex-col gap-y-1 rounded-lg bg-black-15 sm:w-20"
            onClick={onClick}
        >
            {isLoading ? <Spinner size={24} /> : icon}
            <div className="text-small">{isLoading ? '...' : caption}</div>
        </div>
    )
}
