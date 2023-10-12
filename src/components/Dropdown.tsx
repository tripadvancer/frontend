'use client'

import { useRef, useState } from 'react'

import classNames from 'classnames'

import { useKeypress } from '@/hooks/useKeypress'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { Keys } from '@/utils/enums'

import { ActionControl } from './ActionControl'

type DropdownItemProps = {
    caption: string
    value: string
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
                                'hover-animated cursor-pointer rounded p-1.5 text-sm text-custom-blue-100 last:mb-0 hover:bg-custom-blue-10',
                                {
                                    'font-medium': item.value === currentItem,
                                },
                            )}
                            onClick={() => {
                                item.onClick()
                                setVisible(false)
                            }}
                        >
                            {item.caption}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
