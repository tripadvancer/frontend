'use client'

import classNames from 'classnames'

type ButtonStrokeProps = {
    children: React.ReactNode
    type?: 'button' | 'submit'
    variant?: 'blue' | 'orange' | 'red'
    className?: string
    isDisabled?: boolean
    onClick?: () => void
}

export const ButtonStroke = ({
    children,
    type = 'button',
    variant = 'blue',
    className = '',
    isDisabled = false,
    onClick,
}: ButtonStrokeProps) => {
    return (
        <button
            type={type}
            className={classNames(
                'hover-animated h-10 rounded-lg border px-6 text-center font-medium focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                {
                    'border-blue-20 text-blue-100 hover:border-blue-active hover:text-blue-active': variant === 'blue',
                    'border-orange-20 text-orange-100 hover:border-orange-active hover:text-orange-active': variant === 'orange',
                    'border-red-20 text-red-100 hover:border-red-active hover:text-red-active': variant === 'red',
                },
                className,
            )}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
