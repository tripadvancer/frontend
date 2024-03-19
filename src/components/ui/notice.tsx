'use client'

import classNames from 'classnames'

type NoticeProps = {
    children: React.ReactNode
    type: 'warning' | 'info'
}

export const Notice = ({ children, type }: NoticeProps) => {
    return (
        <div
            className={classNames('relative py-2 text-small text-black-70', {
                'bg-red-20': type === 'warning',
                'bg-orange-10': type === 'info',
            })}
        >
            <div className="container">{children}</div>
        </div>
    )
}
