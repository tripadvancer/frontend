'use client'

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
            className={`${className} h-10 rounded-lg bg-custom-blue-100 px-6 text-center text-sm text-white hover-animated hover:bg-custom-blue-active focus:outline-none disabled:cursor-no-drop disabled:opacity-30`}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
