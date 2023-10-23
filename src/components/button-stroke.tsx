'use client'

import classNames from 'classnames'

type ButtonStrokeProps = {
    children: React.ReactNode
    type?: 'button' | 'submit'
    className?: string
    isDisabled?: boolean
    onClick?: () => void
}

export const ButtonStroke = ({
    children,
    type = 'button',
    className = '',
    isDisabled = false,
    onClick,
}: ButtonStrokeProps) => {
    return (
        <button
            type={type}
            className={classNames(
                'border-blue-20 hover-animated hover:border-blue-active hover:text-blue-active h-10 rounded-lg border px-6 text-center font-medium text-blue-100 focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                className,
            )}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
