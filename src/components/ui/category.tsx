'use client'

import classNames from 'classnames'

type CategoryProps = {
    children: React.ReactNode
    variant: 'blue' | 'orange'
    isSelected?: boolean
    onClick: () => void
}

export const Category = ({ children, variant, isSelected, onClick }: CategoryProps) => {
    return (
        <div
            className={classNames(
                `hover-animated flex h-8 cursor-pointer items-center rounded-full bg-white px-4 text-small text-${variant}-100 hover:text-${variant}-active`,
                {
                    [`!bg-${variant}-20`]: isSelected,
                },
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
