import { ReactNode } from 'react'

import classNames from 'classnames'

type FormButtonSkeletonProps = {
    children?: ReactNode
    className?: string
}

export const FormButtonSkeleton = ({ children, className }: FormButtonSkeletonProps) => {
    return (
        <div className={classNames('flex-center bg-black-5 text-black-40 h-10 rounded-lg px-6', className)}>
            <span className="invisible">{children}</span>
        </div>
    )
}
