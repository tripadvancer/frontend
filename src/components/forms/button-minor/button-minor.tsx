import classNames from 'classnames'

type ButtonMinorProps = {
    children: React.ReactNode
    className?: string
    isDisabled?: boolean
    onClick: () => void
}

export const ButtonMinor = ({ children, className, isDisabled, onClick }: ButtonMinorProps) => {
    return (
        <button
            className={classNames(
                'hover-animated flex h-8 cursor-pointer items-center justify-center gap-x-2 bg-blue-20 px-6 text-small-bold text-blue-100 enabled:hover:bg-blue-active enabled:hover:text-white disabled:cursor-no-drop disabled:opacity-30',
                className,
            )}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
