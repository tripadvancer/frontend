import { ReactNode } from 'react'

import classNames from 'classnames'

type FormButtonSkeletonProps = {
    children?: ReactNode
    className?: string
}

export const FormButtonSkeleton = ({ children, className }: FormButtonSkeletonProps) => {
    return (
        <div className={classNames('flex-center h-10 rounded-lg bg-black-5 px-6 text-black-40', className)}>
            {children}
        </div>
    )
}
