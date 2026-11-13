'use client'

import classNames from 'classnames'

type SelectCategoriesItemProps = {
    id: number
    name: string
    isSelected: boolean
    isDisabled: boolean
    onClick: (categoryId: number) => void
}

export const SelectCategoriesItem = ({ id, name, isSelected, isDisabled, onClick }: SelectCategoriesItemProps) => {
    return (
        <div
            className={classNames(
                'flex-center hover-animated bg-blue-20 text-small h-8 cursor-pointer rounded-full border px-4 text-blue-100 sm:hover:border-blue-100 sm:hover:bg-white',
                {
                    'border-blue-100 bg-white': isSelected,
                    'pointer-events-none opacity-30': isDisabled,
                },
            )}
            onClick={() => onClick(id)}
        >
            {name}
        </div>
    )
}
