'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

type AuthLinkProps = {
    className?: string
    isDisabled?: boolean
    children: ReactNode
    onClick: () => void
}

// Switches between the auth dialogs; disabled until the app settings needed by the forms are loaded
export const AuthLink = ({ className, isDisabled, children, onClick }: AuthLinkProps) => {
    return (
        <span
            className={classNames('link', className, { 'pointer-events-none opacity-50': isDisabled })}
            onClick={isDisabled ? undefined : onClick}
        >
            {children}
        </span>
    )
}
