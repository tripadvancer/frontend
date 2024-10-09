import { ReactNode } from 'react'

import classNames from 'classnames'

type NoticeProps = {
    message: ReactNode
    variant: 'blue' | 'red'
    icon?: ReactNode
}

export const Notice = ({ message, variant, icon }: NoticeProps) => {
    const colors = {
        blue: 'border-blue-100 text-blue-100',
        red: 'border-red-100 text-red-100',
    }

    return (
        <div className={classNames('flex gap-x-2 rounded-2xl border p-4 text-big', colors[variant])}>
            <div>{icon}</div>
            <p className="text-black-100">{message}</p>
        </div>
    )
}
