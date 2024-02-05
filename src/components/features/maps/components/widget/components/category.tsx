import classNames from 'classnames'

type CategoryProps = {
    name: string
    isSelected: boolean
    onClick: () => void
}

export const Category = ({ name, isSelected, onClick }: CategoryProps) => {
    return (
        <div
            className={classNames(
                'hover-animated flex h-8 items-center justify-center rounded-full px-4 text-blue-100 hover:text-blue-active',
                {
                    'bg-white': !isSelected,
                    'bg-blue-20': isSelected,
                },
            )}
            onClick={onClick}
        >
            {name}
        </div>
    )
}
