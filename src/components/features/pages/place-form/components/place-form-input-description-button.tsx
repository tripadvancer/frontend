'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

type PlaceFormInputDescriptionButtonProps = {
    icon: ReactNode
    isActive: boolean
    onClick: () => void
}

export const PlaceFormInputDescriptionButton = ({ icon, isActive, onClick }: PlaceFormInputDescriptionButtonProps) => {
    return (
        <div
            className={classNames(
                'flex-center size-10 cursor-pointer rounded-lg bg-blue-10 text-black-40',
                isActive && 'bg-blue-20 text-blue-active',
            )}
            onClick={onClick}
        >
            {icon}
        </div>
    )
}
