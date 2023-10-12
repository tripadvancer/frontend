'use client'

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
            className={`${className} h-10 rounded-lg border border-custom-blue-20 px-6 text-center text-sm text-custom-blue-100 hover-animated hover:border-custom-blue-active hover:text-custom-blue-active focus:outline-none disabled:cursor-no-drop disabled:opacity-30`}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
