'use client'

import classNames from 'classnames'

type SelectCategoriesCategoryProps = {
    id: number
    localizedName: string
    isSelected: boolean
    isDisabled: boolean
    onClick: (categoryId: number) => void
}

export const SelectCategoriesCategory = ({
    id,
    localizedName,
    isSelected,
    isDisabled,
    onClick,
}: SelectCategoriesCategoryProps) => {
    return (
        <div
            className={classNames(
                'flex-center hover-animated h-8 cursor-pointer rounded-full bg-blue-20 px-4 text-small text-blue-100 sm:hover:bg-blue-active sm:hover:text-blue-20',
                {
                    'bg-blue-active text-blue-20': isSelected,
                    'pointer-events-none opacity-30': isDisabled,
                },
            )}
            onClick={() => onClick(id)}
        >
            {localizedName}
        </div>
    )
}
