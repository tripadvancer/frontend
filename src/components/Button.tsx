'use client'

import classNames from 'classnames'

type ButtonProps = {
    children: React.ReactNode
    type?: 'button' | 'submit'
    className?: string
    isDisabled?: boolean
    onClick?: () => void
}

export const Button = ({ children, type = 'button', className = '', isDisabled = false, onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            className={classNames(
                'hover-animated hover:bg-blue-active h-10 rounded-lg bg-blue-100 px-6 text-center font-medium text-white focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                className,
            )}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
