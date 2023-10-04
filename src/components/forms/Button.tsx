type ButtonProps = {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
    return (
        <button
            className={`${className} h-10 rounded-lg bg-custom-orange-100 px-6 text-sm font-medium text-white transition-colors duration-300 ease-in-out hover:bg-custom-orange-active`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
