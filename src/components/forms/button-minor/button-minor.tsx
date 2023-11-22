import classNames from 'classnames'

type ButtonMinorProps = {
    children: React.ReactNode
    className?: string
    onClick: () => void
}

export const ButtonMinor = ({ children, className, onClick }: ButtonMinorProps) => {
    return (
        <button
            className={classNames(
                'hover-animated flex h-8 cursor-pointer items-center justify-center gap-x-2 bg-blue-20 px-6 text-small-bold text-blue-100 hover:bg-blue-active hover:text-white',
                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
