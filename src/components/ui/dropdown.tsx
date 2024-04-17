'use client'

import { ReactNode, useRef, useState } from 'react'

import classNames from 'classnames'
import { useOnClickOutside } from 'usehooks-ts'

import { ActionButton } from '@/components/ui/action-button'
import { ConfirmationMini } from '@/components/ui/confirmation-mini'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

export type DropdownItemProps = {
    caption: string
    icon?: ReactNode
    value: string
    isRed?: boolean
    isCurrent?: boolean
    requiredConfirmation?: boolean
    onClick: () => void
}

type DropdownProps = {
    items: DropdownItemProps[]
    children?: ReactNode
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

    const handleClick = (item: DropdownItemProps) => {
        setVisible(false)
        item.onClick()
    }

    return (
        <div className="relative" ref={ref}>
            <div onClick={() => setVisible(!visible)}>
                {children ? children : <ActionButton isActivated={visible} />}
            </div>
            {visible && (
                <ul className="absolute right-0 top-full w-40 rounded-lg bg-white p-1.5 shadow-medium">
                    {items.map(item => (
                        <DropdownItem
                            key={item.value}
                            {...item}
                            isCurrent={item.value === currentItem}
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

const DropdownItem = (props: DropdownItemProps) => {
    const [isConfirm, setIsConfirm] = useState<boolean>(false)

    const handleClick = () => {
        props.requiredConfirmation ? setIsConfirm(true) : props.onClick()
    }

    const handleCancel = () => {
        setIsConfirm(false)
    }

    const handleConfirm = () => {
        setIsConfirm(false)
        props.onClick()
    }

    if (isConfirm) {
        return (
            <li className="hover-animated flex items-center gap-x-1 rounded p-1.5 text-blue-100 last:mb-0 hover:bg-blue-10">
                <ConfirmationMini onCancel={handleCancel} onConfirm={handleConfirm} />
            </li>
        )
    }

    return (
        <li
            className={classNames(
                'flex cursor-pointer items-center gap-x-2 rounded p-1.5 text-blue-100 last:mb-0 hover:bg-blue-10',
                {
                    'font-medium': props.isCurrent,
                    'text-red-100': props.isRed,
                },
            )}
            onClick={handleClick}
        >
            {props.icon}
            {props.caption}
        </li>
    )
}
