'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

type AuthLinkProps = {
    children: ReactNode
    className?: string
    isDisabled?: boolean
    onClick: () => void
}

// Switches between the auth dialogs; disabled until the app settings needed by the forms are loaded
export const AuthLink = ({ children, className, isDisabled, onClick }: AuthLinkProps) => {
    return (
        <span
            className={classNames('link', className, { 'pointer-events-none opacity-50': isDisabled })}
            onClick={isDisabled ? undefined : onClick}
        >
            {children}
        </span>
    )
}
