'use client'

type ButtonProps = {
    children: React.ReactNode
    type?: 'button' | 'submit' | 'reset'
    className?: string
    onClick?: () => void
}

export const Button = ({ children, type = 'button', className = '', onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`${className} h-10 rounded-lg bg-custom-blue-100 px-6 text-center text-sm text-white transition-colors duration-300 ease-in-out hover:bg-custom-blue-active focus:outline-none`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
