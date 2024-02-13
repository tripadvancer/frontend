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
                'hover-animated flex h-8 cursor-pointer items-center justify-center rounded-full bg-white px-4 text-small text-blue-100 hover:text-blue-active',
                {
                    '!bg-blue-20': isSelected,
                },
            )}
            onClick={onClick}
        >
            {name}
        </div>
    )
}
