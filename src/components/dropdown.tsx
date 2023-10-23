'use client'

import { useRef, useState } from 'react'

import classNames from 'classnames'

import { ActionControl } from '@/components/action-control'
import { useKeypress } from '@/hooks/use-keypress'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { Keys } from '@/utils/enums'

type DropdownItemProps = {
    caption: string
    icon?: React.ReactNode
    value: string
    isRed?: boolean
    onClick: () => void
}

type DropdownProps = {
    items: DropdownItemProps[]
    children?: React.ReactNode
    currentItem?: string
}

export const Dropdown = ({ children, items, currentItem }: DropdownProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState<boolean>(false)

    useOnClickOutside(ref, () => {
        setVisible(false)
    })

    useKeypress(Keys.ESCAPE, () => {
        setVisible(false)
    })

    return (
        <div className="relative" ref={ref}>
            <div onClick={() => setVisible(!visible)}>
                {children ? children : <ActionControl isActivated={visible} />}
            </div>
            {visible && (
                <ul className="absolute right-0 top-full w-40 rounded-lg bg-white p-1.5 shadow-medium">
                    {items.map(item => (
                        <li
                            key={item.value}
                            className={classNames(
                                'hover-animated flex cursor-pointer items-center gap-x-2 rounded p-1.5 text-blue-100 last:mb-0 hover:bg-blue-10',
                                {
                                    'font-medium': item.value === currentItem,
                                    'text-red-100': item.isRed,
                                },
                            )}
                            onClick={() => {
                                item.onClick()
                                setVisible(false)
                            }}
                        >
                            {item.icon}
                            {item.caption}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
