'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

type CategoryProps = {
    children: ReactNode
    variant: 'blue' | 'orange'
    isSelected?: boolean
    onClick: () => void
}

export const Category = ({ children, variant, isSelected, onClick }: CategoryProps) => {
    const colorVariants = {
        blue: 'text-blue-100 hover:text-blue-active',
        orange: 'text-orange-100 hover:text-orange-active',
    }

    const selectedColorVariants = {
        blue: '!bg-blue-20',
        orange: '!bg-orange-20',
    }

    return (
        <div
            className={classNames(
                colorVariants[variant],
                'hover-animated flex h-8 cursor-pointer items-center whitespace-nowrap rounded-full bg-white px-4 text-small',
                {
                    [selectedColorVariants[variant]]: isSelected,
                },
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
