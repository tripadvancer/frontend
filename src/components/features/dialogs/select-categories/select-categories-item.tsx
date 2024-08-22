'use client'

import classNames from 'classnames'

type SelectCategoriesItemProps = {
    id: number
    localizedName: string
    isSelected: boolean
    isDisabled: boolean
    onClick: (categoryId: number) => void
}

export const SelectCategoriesItem = ({
    id,
    localizedName,
    isSelected,
    isDisabled,
    onClick,
}: SelectCategoriesItemProps) => {
    return (
        <div
            className={classNames(
                'flex-center hover-animated h-8 cursor-pointer rounded-full border bg-blue-20 px-4 text-small text-blue-100 sm:hover:border-blue-100 sm:hover:bg-white',
                {
                    'border-blue-100 bg-white': isSelected,
                    'pointer-events-none opacity-30': isDisabled,
                },
            )}
            onClick={() => onClick(id)}
        >
            {localizedName}
        </div>
    )
}
