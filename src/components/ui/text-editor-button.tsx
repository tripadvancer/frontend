'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

type TextEditorButtonProps = {
    icon: ReactNode
    isActive: boolean
    onClick: () => void
}

export const TextEditorButton = ({ icon, isActive, onClick }: TextEditorButtonProps) => {
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
