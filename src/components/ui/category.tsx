'use client'

import classNames from 'classnames'

type CategoryProps = {
    children: React.ReactNode
    variant: 'blue' | 'orange'
    isSelected?: boolean
    onClick: () => void
}

export const Category = ({ children, variant, isSelected, onClick }: CategoryProps) => {
    const baseClass = `hover-animated flex h-8 cursor-pointer items-center rounded-full bg-white px-4 text-small text-${variant}-100 hover:text-${variant}-active`
    const selectedClass = isSelected ? `!bg-${variant}-20` : ''

    return (
        <div className={classNames(baseClass, selectedClass)} onClick={onClick}>
            {children}
        </div>
    )
}
