'use client'

import classNames from 'classnames'

type CategoryProps = {
    name: string
    isSelected: boolean
    onClick: () => void
}

export const WidgetCategory = ({ name, isSelected, onClick }: CategoryProps) => {
    return (
        <div
            className={classNames(
                'hover-animated flex h-8 items-center justify-center rounded-full px-4 text-blue-100 hover:text-blue-active',
                `${isSelected ? 'bg-blue-20' : 'bg-white'}`,
            )}
            onClick={onClick}
        >
            {name}
        </div>
    )
}
