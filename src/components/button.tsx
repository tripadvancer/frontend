'use client'

import classNames from 'classnames'

type ButtonProps = {
    children: React.ReactNode
    type?: 'button' | 'submit'
    variant?: 'blue' | 'orange' | 'red'
    className?: string
    isDisabled?: boolean
    onClick?: () => void
}

export const Button = ({
    children,
    type = 'button',
    variant = 'blue',
    className,
    isDisabled,
    onClick,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={classNames(
                'hover-animated h-10 rounded-lg px-6 text-center font-medium text-white focus:outline-none disabled:cursor-no-drop disabled:opacity-30',
                {
                    'bg-blue-100 hover:bg-blue-active': variant === 'blue',
                    'bg-orange-100 hover:bg-orange-active': variant === 'orange',
                    'hover:bg-red-active bg-red-100': variant === 'red',
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
