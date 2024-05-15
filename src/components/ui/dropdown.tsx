'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

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
            <li className="hover-animated flex items-center gap-x-1 text-nowrap rounded p-1.5 text-blue-100 last:mb-0 hover:bg-blue-10">
                <ConfirmationMini onCancel={handleCancel} onConfirm={handleConfirm} />
            </li>
        )
    }

    return (
        <li
            className={classNames(
                'flex cursor-pointer items-center gap-x-2 text-nowrap rounded p-1.5 text-blue-100 last:mb-0 hover:bg-blue-10',
                {
                    'font-medium': props.isCurrent,
                    'text-red-100': props.isRed,
                },
            )}
            onClick={handleClick}
        >
            <div>{props.icon}</div>
            <div>{props.caption}</div>
        </li>
    )
}

type DropdownProps = {
    variant?: 'default' | 'white'
    items: DropdownItemProps[]
    position?: 'left' | 'right' | 'center'
    children?: ReactNode
    currentItem?: string
}

export const Dropdown = ({ variant = 'default', children, items, position = 'right', currentItem }: DropdownProps) => {
    const GAP = 4

    const containerRef = useRef<HTMLDivElement>(null)
    const toggleRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const [style, setStyle] = useState<React.CSSProperties>({})
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const determinatePosition = () => {
        const listHeight = (listRef.current?.clientHeight || 0) + (toggleRef.current?.clientHeight || 0) + GAP
        const toggleTop = toggleRef.current?.getBoundingClientRect().top || 0

        console.log(window.innerHeight, toggleTop, listHeight)

        if (window.innerHeight - toggleTop < listHeight) {
            setStyle({ bottom: `calc(100% + ${GAP}px)` })
        } else {
            setStyle({ top: `calc(100% + ${GAP}px)` })
        }
    }

    useEffect(() => {
        if (isVisible) {
            determinatePosition()
        }
    }, [isVisible])

    useOnClickOutside(containerRef, () => {
        setIsVisible(false)
    })

    useKeypress(Keys.ESCAPE, () => {
        setIsVisible(false)
    })

    const handleItemClick = (item: DropdownItemProps) => {
        setIsVisible(false)
        item.onClick()
    }

    return (
        <div ref={containerRef} className="relative">
            <div ref={toggleRef} className="relative z-10 cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
                {children ? children : <ActionButton isActivated={isVisible} />}
            </div>

            <ul
                ref={listRef}
                className={classNames('absolute z-20 min-w-40 rounded-lg bg-white p-1.5 shadow-medium', {
                    block: isVisible,
                    hidden: !isVisible,
                    'left-0': position === 'left',
                    'right-0': position === 'right',
                    'left-1/2 -translate-x-1/2': position === 'center',
                })}
                style={style}
            >
                {items.map(item => (
                    <DropdownItem
                        key={`dropdown-item-${item.value}`}
                        {...item}
                        isCurrent={item.value === currentItem}
                        onClick={() => handleItemClick(item)}
                    />
                ))}
            </ul>
        </div>
    )
}
